use std::fmt::{self, Display};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Role {
    Viewer,
    Maker,
    Checker,
    Compliance,
    Examiner,
}

impl Display for Role {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match self {
            Role::Viewer => "Viewer",
            Role::Maker => "Maker",
            Role::Checker => "Checker",
            Role::Compliance => "Compliance",
            Role::Examiner => "Examiner",
        })
    }
}

impl Role {
    pub fn can_create(self) -> bool {
        matches!(self, Role::Maker | Role::Compliance)
    }

    pub fn can_decide(self) -> bool {
        matches!(self, Role::Checker | Role::Compliance)
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Actor {
    pub id: String,
    pub role: Role,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ActionKind {
    Integration,
    FreeformSend,
    Custody,
    Pan,
    AchFile,
}

impl ActionKind {
    pub fn is_prohibited(self) -> bool {
        matches!(
            self,
            ActionKind::FreeformSend | ActionKind::Custody | ActionKind::Pan | ActionKind::AchFile
        )
    }
}

impl Display for ActionKind {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match self {
            ActionKind::Integration => "integration",
            ActionKind::FreeformSend => "freeform_send",
            ActionKind::Custody => "custody",
            ActionKind::Pan => "pan",
            ActionKind::AchFile => "ach_file",
        })
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Status {
    Pending,
    Approved,
    Rejected,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Decision {
    Approve,
    Reject,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct IntentRequest {
    pub kind: ActionKind,
    pub connector: Option<String>,
    pub vendor_decision_id: Option<String>,
    pub member_data: Option<String>,
}

impl IntentRequest {
    pub fn integration(
        connector: impl Into<String>,
        vendor_decision_id: impl Into<String>,
    ) -> Self {
        Self {
            kind: ActionKind::Integration,
            connector: Some(connector.into()),
            vendor_decision_id: Some(vendor_decision_id.into()),
            member_data: None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Intent {
    pub id: String,
    pub maker_id: String,
    pub kind: ActionKind,
    pub connector: Option<String>,
    pub vendor_decision_id: Option<String>,
    pub status: Status,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct EvidenceEvent {
    pub seq: u64,
    pub at: String,
    pub actor_id: String,
    pub role: Role,
    pub kind: String,
    pub intent_id: String,
    pub detail: String,
    pub vendor_decision_id: Option<String>,
}
