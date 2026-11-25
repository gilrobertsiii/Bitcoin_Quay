use std::fmt::{self, Display};

use crate::types::{ActionKind, Role};

#[derive(Debug)]
pub enum QuayError {
    RoleCannotCreate(Role),
    RoleCannotDecide(Role),
    SelfApproval,
    UnknownConnector(String),
    MissingConnector,
    MissingVendorDecisionId,
    MemberDataRefused,
    ForbiddenAction(ActionKind),
    KindNotAllowed(ActionKind),
    IntentNotFound(String),
    AlreadyDecided(String),
    AttestationClaim,
    Profile(String),
    Ledger(String),
    Io(std::io::Error),
}

impl Display for QuayError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            QuayError::RoleCannotCreate(role) => write!(
                f,
                "Creating an intent requires the Maker or Compliance role. This actor is {role}."
            ),
            QuayError::RoleCannotDecide(role) => write!(
                f,
                "Deciding an intent requires the Checker or Compliance role. This actor is {role}."
            ),
            QuayError::SelfApproval => {
                write!(f, "The maker of an intent cannot decide it.")
            }
            QuayError::UnknownConnector(name) => {
                write!(f, "Connector `{name}` is outside the allowlist.")
            }
            QuayError::MissingConnector => {
                write!(f, "An integration intent needs a connector name.")
            }
            QuayError::MissingVendorDecisionId => {
                write!(f, "This profile requires a vendor decision id.")
            }
            QuayError::MemberDataRefused => {
                write!(f, "Member data stays out of this ledger.")
            }
            QuayError::ForbiddenAction(kind) => {
                write!(f, "Action `{kind}` is outside the Quay control set.")
            }
            QuayError::KindNotAllowed(kind) => {
                write!(f, "The loaded profile does not allow action `{kind}`.")
            }
            QuayError::IntentNotFound(id) => write!(f, "Intent `{id}` is not in this ledger."),
            QuayError::AlreadyDecided(id) => write!(f, "Intent `{id}` already has a decision."),
            QuayError::AttestationClaim => write!(
                f,
                "A profile cannot claim a certification. Set attestation to false or omit it."
            ),
            QuayError::Profile(message) => write!(f, "Profile could not be loaded: {message}"),
            QuayError::Ledger(message) => write!(f, "Ledger could not be read: {message}"),
            QuayError::Io(err) => write!(f, "Ledger file could not be read: {err}"),
        }
    }
}

impl std::error::Error for QuayError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            QuayError::Io(err) => Some(err),
            _ => None,
        }
    }
}

impl From<std::io::Error> for QuayError {
    fn from(value: std::io::Error) -> Self {
        QuayError::Io(value)
    }
}
