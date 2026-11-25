# Bitcoin Quay

Bitcoin Quay is a compliance-oriented fork of [BTCDecoded/blvm](https://github.com/BTCDecoded/blvm). Credit unions are the first profile. The same controls are mapped for an auditor in a SOC 1 / SOC 2 crosswalk. That crosswalk is control design. It is not a SOC, PCI, or NACHA attestation.

Upstream base: `baeac633346ad9ff55b80ab7b8a55ebe0157d18c` (`upstream/main` when this fork was cut).

## What is upstream

The `blvm` binary, its features, and its release process stay Bitcoin Commons. This fork does not vendor `blvm-node`, `blvm-consensus`, or the other sibling crates.

`Cargo.toml` omits the upstream `[patch.crates-io]` block. That block points at sibling checkouts (`../blvm-node` and the rest) which are not in this repository. Dependencies resolve from crates.io. When you merge an upstream release tag, drop `[patch.crates-io]` again before building.

`upstream` is `https://github.com/BTCDecoded/blvm.git`. Merge their release tags. Do not push this fork to BTCDecoded remotes.

Release-note CI (`scripts/release/build_release_notes.py --check`) regenerates published sections from **git tags** merged into `HEAD` (for example `v0.3.0-beta.9`). A fresh Quay clone or GitHub mirror that has history but no tags will fail that job with empty regenerated sections. After adding the upstream remote:

```bash
git fetch upstream --tags
git push origin --tags
```

## What Quay adds

`quay/` is a separate package. It is not a workspace member and it is not linked into the default `blvm` binary. `blvm-payment` is the precedent: a separate process. `quay/module.toml` names the module for an operator who later copies the `quay` binary into a node `modules_dir`. It is not listed in `registry/modules.json`, and `blvm.toml.example` still points the registry at BTCDecoded.

The crate records intents and decisions:

- Maker and Compliance can create an intent.
- Checker and Compliance can decide an intent.
- The maker of an intent cannot decide it.
- Viewer and Examiner cannot create or decide.
- Evidence is append-only: actor, action, time, and vendor decision id.
- Integrations must name a connector on the profile allowlist.
- The crate refuses freeform send, custody, PAN storage, ACH file generation, and member-data payloads.

```bash
cargo test --manifest-path quay/Cargo.toml
cargo run --manifest-path quay/Cargo.toml -- export --ledger ledger.json
```

Profiles:

- `quay/profiles/credit-union.toml` — exam evidence, masked member data, vendor decision ids, three named connectors.
- `quay/profiles/soc-crosswalk.toml` — the same control set, plus criteria an auditor can test. `attestation = true` is rejected at load.

## Promo site

`website/` is the public site for `bitcoinquay.com`. The Vercel project `bitcoin-quay` uses `website` as its root directory. The site does not ship the operator console, waitlist storage, or demo credentials.

## Deferred (may be open-sourced later)

The following stay out of the public tree for now and can be published in a later pass:

- Operator console (RBAC UI, approvals queue, integration boundary UI)
- Local planning materials under `planning/` (gitignored)

Until then, dual-control behavior is exercised via the `quay/` crate and its tests, not a shipped web console in this repository.
