use std::fs;
use std::path::Path;

use serde::Deserialize;

use crate::error::QuayError;
use crate::types::ActionKind;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CrosswalkEntry {
    pub control: String,
    pub criteria: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Profile {
    pub name: String,
    pub mask_member_data: bool,
    pub require_vendor_decision_id: bool,
    pub allowed_kinds: Vec<ActionKind>,
    pub connectors: Vec<String>,
    pub crosswalk: Vec<CrosswalkEntry>,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct ProfileFile {
    name: String,
    mask_member_data: bool,
    require_vendor_decision_id: bool,
    allowed_kinds: Vec<ActionKind>,
    connectors: Vec<String>,
    #[serde(default)]
    attestation: bool,
    #[serde(default)]
    crosswalk: Vec<CrosswalkFile>,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct CrosswalkFile {
    control: String,
    criteria: String,
}

impl Profile {
    pub fn from_toml_str(text: &str) -> Result<Self, QuayError> {
        let file: ProfileFile =
            toml::from_str(text).map_err(|err| QuayError::Profile(err.to_string()))?;
        if file.attestation {
            return Err(QuayError::AttestationClaim);
        }
        if file.name.trim().is_empty() {
            return Err(QuayError::Profile("name is empty".to_string()));
        }
        Ok(Self {
            name: file.name,
            mask_member_data: file.mask_member_data,
            require_vendor_decision_id: file.require_vendor_decision_id,
            allowed_kinds: file.allowed_kinds,
            connectors: file.connectors,
            crosswalk: file
                .crosswalk
                .into_iter()
                .map(|entry| CrosswalkEntry {
                    control: entry.control,
                    criteria: entry.criteria,
                })
                .collect(),
        })
    }

    pub fn load(path: impl AsRef<Path>) -> Result<Self, QuayError> {
        let text = fs::read_to_string(path.as_ref())?;
        Self::from_toml_str(&text)
    }
}
