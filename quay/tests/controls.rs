use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

use quay::{
    ActionKind, Decision, IntentRequest, Ledger, Profile, QuayError, Role, Status, actor,
    export_command,
};

fn profile_path(name: &str) -> String {
    format!("{}/profiles/{name}.toml", env!("CARGO_MANIFEST_DIR"))
}

fn credit_union() -> Ledger {
    let profile = Profile::load(profile_path("credit-union")).expect("credit-union profile");
    Ledger::from_profile(profile)
}

fn integration(connector: &str, vendor_decision_id: &str) -> IntentRequest {
    IntentRequest::integration(connector, vendor_decision_id)
}

#[test]
fn credit_union_profile_masks_member_data_and_names_connectors() {
    let ledger = credit_union();
    assert_eq!(ledger.profile_name(), "credit-union");
    assert!(ledger.mask_member_data());
}

#[test]
fn maker_creates_and_checker_approves_and_rejects() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let checker = actor("checker-1", Role::Checker);

    let approved = ledger
        .create_intent(
            &maker,
            integration("core-query", "vd-1"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    let rejected = ledger
        .create_intent(
            &maker,
            integration("sanctions-vendor", "vd-2"),
            "2026-11-24T12:01:00Z",
        )
        .expect("create");

    ledger
        .decide(
            &checker,
            &approved,
            Decision::Approve,
            "2026-11-24T12:05:00Z",
        )
        .expect("approve");
    ledger
        .decide(
            &checker,
            &rejected,
            Decision::Reject,
            "2026-11-24T12:06:00Z",
        )
        .expect("reject");

    assert_eq!(ledger.intents()[0].status, Status::Approved);
    assert_eq!(ledger.intents()[1].status, Status::Rejected);
    assert_eq!(ledger.evidence().len(), 4);
    assert_eq!(ledger.evidence()[2].kind, "intent.approved");
    assert_eq!(
        ledger.evidence()[2].vendor_decision_id.as_deref(),
        Some("vd-1")
    );
    assert_eq!(ledger.evidence()[3].kind, "intent.rejected");
}

#[test]
fn compliance_can_create_and_decide_a_different_makers_intent() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let compliance = actor("compliance-1", Role::Compliance);
    let id = ledger
        .create_intent(
            &maker,
            integration("processor-decision", "vd-9"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    ledger
        .decide(&compliance, &id, Decision::Approve, "2026-11-24T12:05:00Z")
        .expect("compliance decides");
    assert_eq!(ledger.intents()[0].status, Status::Approved);
}

#[test]
fn maker_cannot_decide_own_intent_even_after_a_role_switch() {
    let mut ledger = credit_union();
    let maker = actor("sam", Role::Maker);
    let same_person = actor("sam", Role::Checker);
    let id = ledger
        .create_intent(
            &maker,
            integration("core-query", "vd-3"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    let err = ledger
        .decide(&same_person, &id, Decision::Approve, "2026-11-24T12:05:00Z")
        .expect_err("self approval");
    assert!(matches!(err, QuayError::SelfApproval));
    assert_eq!(ledger.intents()[0].status, Status::Pending);
}

#[test]
fn compliance_cannot_decide_own_intent() {
    let mut ledger = credit_union();
    let compliance = actor("compliance-1", Role::Compliance);
    let id = ledger
        .create_intent(
            &compliance,
            integration("core-query", "vd-4"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    let err = ledger
        .decide(&compliance, &id, Decision::Approve, "2026-11-24T12:05:00Z")
        .expect_err("self approval");
    assert!(matches!(err, QuayError::SelfApproval));
}

#[test]
fn examiner_and_viewer_cannot_create_or_decide() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let id = ledger
        .create_intent(
            &maker,
            integration("core-query", "vd-5"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");

    for role in [Role::Examiner, Role::Viewer] {
        let reader = actor("reader", role);
        let create_err = ledger
            .create_intent(
                &reader,
                integration("core-query", "vd-6"),
                "2026-11-24T12:02:00Z",
            )
            .expect_err("create blocked");
        assert!(matches!(create_err, QuayError::RoleCannotCreate(_)));
        let decide_err = ledger
            .decide(&reader, &id, Decision::Approve, "2026-11-24T12:03:00Z")
            .expect_err("decide blocked");
        assert!(matches!(decide_err, QuayError::RoleCannotDecide(_)));
    }
    assert_eq!(ledger.intents()[0].status, Status::Pending);
}

#[test]
fn checker_cannot_create() {
    let mut ledger = credit_union();
    let checker = actor("checker-1", Role::Checker);
    let err = ledger
        .create_intent(
            &checker,
            integration("core-query", "vd-7"),
            "2026-11-24T12:00:00Z",
        )
        .expect_err("checker create");
    assert!(matches!(err, QuayError::RoleCannotCreate(Role::Checker)));
}

#[test]
fn profile_without_integration_refuses_the_kind() {
    let profile = Profile::from_toml_str(
        r#"
name = "narrow"
mask_member_data = true
require_vendor_decision_id = false
allowed_kinds = []
connectors = ["core-query"]
"#,
    )
    .expect("profile");
    let mut ledger = Ledger::from_profile(profile);
    let err = ledger
        .create_intent(
            &actor("maker-1", Role::Maker),
            integration("core-query", "vd-1"),
            "2026-11-24T12:00:00Z",
        )
        .expect_err("kind");
    assert!(matches!(
        err,
        QuayError::KindNotAllowed(ActionKind::Integration)
    ));
}

#[test]
fn unknown_connector_is_rejected() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let err = ledger
        .create_intent(
            &maker,
            integration("random-mcp", "vd-8"),
            "2026-11-24T12:00:00Z",
        )
        .expect_err("allowlist");
    assert!(matches!(err, QuayError::UnknownConnector(_)));
    assert!(ledger.evidence().is_empty());
}

#[test]
fn prohibited_actions_and_member_data_are_refused() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    for kind in [
        ActionKind::FreeformSend,
        ActionKind::Custody,
        ActionKind::Pan,
        ActionKind::AchFile,
    ] {
        let err = ledger
            .create_intent(
                &maker,
                IntentRequest {
                    kind,
                    connector: None,
                    vendor_decision_id: None,
                    member_data: None,
                },
                "2026-11-24T12:00:00Z",
            )
            .expect_err("prohibited");
        assert!(matches!(err, QuayError::ForbiddenAction(_)));
    }

    let err = ledger
        .create_intent(
            &maker,
            IntentRequest {
                kind: ActionKind::Integration,
                connector: Some("core-query".to_string()),
                vendor_decision_id: Some("vd-1".to_string()),
                member_data: Some("member-123".to_string()),
            },
            "2026-11-24T12:00:00Z",
        )
        .expect_err("member data");
    assert!(matches!(err, QuayError::MemberDataRefused));
}

#[test]
fn missing_vendor_decision_id_is_rejected() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let err = ledger
        .create_intent(
            &maker,
            IntentRequest {
                kind: ActionKind::Integration,
                connector: Some("core-query".to_string()),
                vendor_decision_id: Some("  ".to_string()),
                member_data: None,
            },
            "2026-11-24T12:00:00Z",
        )
        .expect_err("vendor id");
    assert!(matches!(err, QuayError::MissingVendorDecisionId));
}

#[test]
fn second_decision_is_rejected() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let checker = actor("checker-1", Role::Checker);
    let id = ledger
        .create_intent(
            &maker,
            integration("core-query", "vd-1"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    ledger
        .decide(&checker, &id, Decision::Approve, "2026-11-24T12:05:00Z")
        .expect("approve");
    let err = ledger
        .decide(&checker, &id, Decision::Reject, "2026-11-24T12:06:00Z")
        .expect_err("second decision");
    assert!(matches!(err, QuayError::AlreadyDecided(_)));
}

#[test]
fn soc_crosswalk_loads_without_an_attestation() {
    let profile = Profile::load(profile_path("soc-crosswalk")).expect("soc profile");
    assert_eq!(profile.name, "soc-crosswalk");
    assert!(profile.mask_member_data);
    assert_eq!(profile.crosswalk.len(), 4);
    assert!(
        profile
            .crosswalk
            .iter()
            .any(|entry| entry.control == "dual-control")
    );

    let claimed = r#"
name = "claimed"
mask_member_data = true
require_vendor_decision_id = true
allowed_kinds = ["integration"]
connectors = ["core-query"]
attestation = true
"#;
    let err = Profile::from_toml_str(claimed).expect_err("attestation");
    assert!(matches!(err, QuayError::AttestationClaim));
}

#[test]
fn export_command_prints_evidence_json() {
    let mut ledger = credit_union();
    let maker = actor("maker-1", Role::Maker);
    let checker = actor("checker-1", Role::Checker);
    let id = ledger
        .create_intent(
            &maker,
            integration("core-query", "vd-export"),
            "2026-11-24T12:00:00Z",
        )
        .expect("create");
    ledger
        .decide(&checker, &id, Decision::Approve, "2026-11-24T12:05:00Z")
        .expect("approve");

    let stamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("clock")
        .as_nanos();
    let path = std::env::temp_dir().join(format!("quay-ledger-{stamp}.json"));
    ledger.save(&path).expect("save");

    let body =
        export_command(["export", "--ledger", path.to_str().expect("utf8 path")]).expect("export");
    let _ = fs::remove_file(&path);
    let events: Vec<serde_json::Value> = serde_json::from_str(&body).expect("json");
    assert_eq!(events.len(), 2);
    assert_eq!(events[1]["kind"], "intent.approved");
    assert_eq!(events[1]["vendor_decision_id"], "vd-export");
    assert_eq!(events[1]["role"], "checker");
}
