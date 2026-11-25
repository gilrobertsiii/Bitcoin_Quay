# Contributing to Bitcoin Quay

Thank you for contributing. This repository is a **compliance-oriented fork** of [BTCDecoded/blvm](https://github.com/BTCDecoded/blvm). Quay-authored code lives in `quay/` and `website/`. The root tree is the upstream BLVM node binary and release tooling.

## Code of Conduct

This project follows the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct).

## Fork rules (read first)

- **Do not push this fork to BTCDecoded remotes.** Upstream is pull/merge only. See [QUAY.md](QUAY.md).
- Quay’s own code stays in `quay/` and `website/` (and Quay-specific docs).
- When you merge an upstream release tag, drop any restored `[patch.crates-io]` block in `Cargo.toml` so the fork keeps building from crates.io.
- Profiles describe control **design**. Do not claim SOC, PCI, or NACHA certification in docs or UI copy.
- Do not add key custody, freeform wallet send, PAN storage, or ACH file generation.

## Where to contribute

| Area | Path | Notes |
|------|------|--------|
| Dual control / evidence / allowlist | `quay/` | Prefer `cargo test --manifest-path quay/Cargo.toml` |
| Promo site | `website/` | Next.js; Vercel root is `website/` |
| Upstream node / release scripts | root tree | Prefer fixing upstream in BTCDecoded when the change is not Quay-specific |

For broad BLVM developer workflow, see the [upstream contributing guide](https://docs.btcdecoded.org/blvm/development/contributing.html).

## Development setup

### Quay crate

```bash
cargo test --manifest-path quay/Cargo.toml
cargo run --manifest-path quay/Cargo.toml -- export --ledger ledger.json
```

### Website

```bash
cd website
npm install
npm run dev
```

### BLVM binary (this fork)

```bash
cargo build --release --locked
```

Requires the Rust toolchain in [`rust-toolchain.toml`](rust-toolchain.toml). Dependencies resolve from crates.io (no sibling-checkout patch table).

## Pull requests

- [ ] Quay changes include tests where behavior is enforceable (`quay/tests/`)
- [ ] Docs updated (`QUAY.md`, README Quay section) when behavior or layout changes
- [ ] No secrets, `.env*`, or local planning materials in the PR
- [ ] No push/target aimed at BTCDecoded remotes
- [ ] Compliance copy stays non-certifying (control design only)

### Review focus

1. Correctness of dual-control and evidence rules  
2. Allowlist enforcement  
3. Clear separation from upstream BLVM  
4. Security (no credential leakage; no custody/PAN/ACH surfaces)

## Security

See [SECURITY.md](SECURITY.md). Quay bugs → this repo’s private reporting. Consensus / node bugs → Bitcoin Commons / BTCDecoded.

## License

Contributions are under the MIT License ([LICENSE](LICENSE), [NOTICE](NOTICE)).
