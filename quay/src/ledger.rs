use std::collections::BTreeSet;
use std::fs;
use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::error::QuayError;
use crate::profile::Profile;
use crate::types::{
    ActionKind, Actor, Decision, EvidenceEvent, Intent, IntentRequest, Role, Status,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ledger {
    profile_name: String,
    mask_member_data: bool,
    require_vendor_decision_id: bool,
    allowed_kinds: BTreeSet<ActionKind>,
    connectors: BTreeSet<String>,
    intents: Vec<Intent>,
    evidence: Vec<EvidenceEvent>,
    next_id: u64,
}

impl Ledger {
    pub fn from_profile(profile: Profile) -> Self {
        Self {
            profile_name: profile.name,
            mask_member_data: profile.mask_member_data,
            require_vendor_decision_id: profile.require_vendor_decision_id,
            allowed_kinds: profile.allowed_kinds.into_iter().collect(),
            connectors: profile.connectors.into_iter().collect(),
            intents: Vec::new(),
            evidence: Vec::new(),
            next_id: 1,
        }
    }

    pub fn profile_name(&self) -> &str {
        &self.profile_name
    }

    pub fn mask_member_data(&self) -> bool {
        self.mask_member_data
    }

    pub fn intents(&self) -> &[Intent] {
        &self.intents
    }

    pub fn evidence(&self) -> &[EvidenceEvent] {
        &self.evidence
    }

    pub fn create_intent(
        &mut self,
        actor: &Actor,
        request: IntentRequest,
        at: &str,
    ) -> Result<String, QuayError> {
        if !actor.role.can_create() {
            return Err(QuayError::RoleCannotCreate(actor.role));
        }
        if let Some(payload) = request.member_data.as_deref()
            && !payload.trim().is_empty()
        {
            return Err(QuayError::MemberDataRefused);
        }

        let (connector, vendor_decision_id) = match request.kind {
            kind if kind.is_prohibited() => {
                return Err(QuayError::ForbiddenAction(kind));
            }
            ActionKind::Integration => {
                if !self.allowed_kinds.contains(&ActionKind::Integration) {
                    return Err(QuayError::KindNotAllowed(ActionKind::Integration));
                }
                let connector = request
                    .connector
                    .as_deref()
                    .map(str::trim)
                    .filter(|name| !name.is_empty())
                    .ok_or(QuayError::MissingConnector)?
                    .to_string();
                if !self.connectors.contains(&connector) {
                    return Err(QuayError::UnknownConnector(connector));
                }
                let vendor_decision_id =
                    normalized_vendor_id(request.vendor_decision_id.as_deref());
                if self.require_vendor_decision_id && vendor_decision_id.is_none() {
                    return Err(QuayError::MissingVendorDecisionId);
                }
                (Some(connector), vendor_decision_id)
            }
            other => return Err(QuayError::ForbiddenAction(other)),
        };

        let id = format!("int-{}", self.next_id);
        self.next_id += 1;
        let detail = connector
            .clone()
            .unwrap_or_else(|| request.kind.to_string());
        let intent = Intent {
            id: id.clone(),
            maker_id: actor.id.clone(),
            kind: request.kind,
            connector,
            vendor_decision_id: vendor_decision_id.clone(),
            status: Status::Pending,
        };
        self.push_event(actor, "intent.created", &id, detail, vendor_decision_id, at);
        self.intents.push(intent);
        Ok(id)
    }

    pub fn decide(
        &mut self,
        actor: &Actor,
        intent_id: &str,
        decision: Decision,
        at: &str,
    ) -> Result<(), QuayError> {
        if !actor.role.can_decide() {
            return Err(QuayError::RoleCannotDecide(actor.role));
        }
        let position = self
            .intents
            .iter()
            .position(|intent| intent.id == intent_id)
            .ok_or_else(|| QuayError::IntentNotFound(intent_id.to_string()))?;
        if self.intents[position].status != Status::Pending {
            return Err(QuayError::AlreadyDecided(intent_id.to_string()));
        }
        if self.intents[position].maker_id == actor.id {
            return Err(QuayError::SelfApproval);
        }

        let kind = match decision {
            Decision::Approve => "intent.approved",
            Decision::Reject => "intent.rejected",
        };
        let detail = self.intents[position]
            .connector
            .clone()
            .unwrap_or_else(|| self.intents[position].kind.to_string());
        let vendor_decision_id = self.intents[position].vendor_decision_id.clone();
        self.intents[position].status = match decision {
            Decision::Approve => Status::Approved,
            Decision::Reject => Status::Rejected,
        };
        self.push_event(actor, kind, intent_id, detail, vendor_decision_id, at);
        Ok(())
    }

    pub fn to_json(&self) -> Result<String, QuayError> {
        serde_json::to_string_pretty(self).map_err(|err| QuayError::Ledger(err.to_string()))
    }

    pub fn from_json(text: &str) -> Result<Self, QuayError> {
        serde_json::from_str(text).map_err(|err| QuayError::Ledger(err.to_string()))
    }

    pub fn save(&self, path: impl AsRef<Path>) -> Result<(), QuayError> {
        fs::write(path.as_ref(), self.to_json()?)?;
        Ok(())
    }

    pub fn load(path: impl AsRef<Path>) -> Result<Self, QuayError> {
        let text = fs::read_to_string(path.as_ref())?;
        Self::from_json(&text)
    }

    pub fn export_evidence_json(&self) -> Result<String, QuayError> {
        serde_json::to_string_pretty(&self.evidence)
            .map_err(|err| QuayError::Ledger(err.to_string()))
    }

    fn push_event(
        &mut self,
        actor: &Actor,
        kind: &str,
        intent_id: &str,
        detail: String,
        vendor_decision_id: Option<String>,
        at: &str,
    ) {
        let seq = u64::try_from(self.evidence.len()).unwrap_or(u64::MAX) + 1;
        self.evidence.push(EvidenceEvent {
            seq,
            at: at.to_string(),
            actor_id: actor.id.clone(),
            role: actor.role,
            kind: kind.to_string(),
            intent_id: intent_id.to_string(),
            detail,
            vendor_decision_id,
        });
    }
}

pub fn export_command<I, S>(args: I) -> Result<String, QuayError>
where
    I: IntoIterator<Item = S>,
    S: AsRef<str>,
{
    let args: Vec<String> = args
        .into_iter()
        .map(|arg| arg.as_ref().to_string())
        .collect();
    let mut ledger_path: Option<String> = None;
    let mut saw_export = false;
    let mut index = 0;
    while index < args.len() {
        let arg = &args[index];
        if !saw_export && arg == "export" {
            saw_export = true;
            index += 1;
            continue;
        }
        if let Some(path) = arg.strip_prefix("--ledger=") {
            ledger_path = Some(path.to_string());
            index += 1;
            continue;
        }
        if arg == "--ledger" {
            let path = args
                .get(index + 1)
                .ok_or_else(|| QuayError::Ledger(usage()))?;
            ledger_path = Some(path.clone());
            index += 2;
            continue;
        }
        return Err(QuayError::Ledger(usage()));
    }
    if !saw_export {
        return Err(QuayError::Ledger(usage()));
    }
    let path = ledger_path.ok_or_else(|| QuayError::Ledger(usage()))?;
    Ledger::load(path)?.export_evidence_json()
}

fn usage() -> String {
    "usage: quay export --ledger <ledger.json>".to_string()
}

fn normalized_vendor_id(value: Option<&str>) -> Option<String> {
    value
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(ToString::to_string)
}

pub fn actor(id: &str, role: Role) -> Actor {
    Actor {
        id: id.to_string(),
        role,
    }
}
