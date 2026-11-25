# Security policy

Bitcoin Quay is a fork of [BTCDecoded/blvm](https://github.com/BTCDecoded/blvm). Report bugs to the project that owns the code.

## Quay (`quay/`, `website/`, Quay docs)

Do not open a public GitHub issue for a vulnerability in Quay-authored code.

1. Use **GitHub private vulnerability reporting** on this repository:  
   `https://github.com/gilrobertsiii/Bitcoin_Quay/security/advisories/new`
2. If private reporting is unavailable, open a private channel with the repository owner listed on GitHub.

Include the path (`quay/` or `website/`), commit, and a minimal reproduction. Quay does not custody keys, store PAN, or generate ACH files; reports about those features being *added* are in scope as policy violations.

### Quay scope

In scope:

- Dual-control bypass (self-approval, wrong role can create or decide).
- Tampering with or forging append-only evidence.
- Integration allowlist bypass (unknown connector accepted).
- Exposure of secrets in `website/` build or deploy config shipped in this repo.

Out of scope:

- Demo or local-only configuration mistakes on a private deploy.
- Third-party Vercel / hosting misconfiguration outside this repository.
- Upstream BLVM consensus, P2P, or RPC bugs (see below).

## Upstream BLVM (node, consensus, release tooling)

Consensus bugs, remote crashes, and memory-safety issues in the BLVM node stack should be reported to **Bitcoin Commons**, not as Quay product bugs.

1. GitHub private vulnerability reporting on the upstream repo that contains the bug:  
   `https://github.com/BTCDecoded/<repo>/security/advisories/new`
2. Email `security@thebitcoincommons.org`.

The encrypted channel is that mailbox. The key fingerprint is `338B 0CE4 AE55 6EBD A677 2C51 DE34 66C3 CA36 3748`. Encrypt to `security@thebitcoincommons.org`. Do not send a live mainnet exploit to a public list.

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEavpigRYJKwYBBAHaRw8BAQdAulfJNxkQbBZdBCnzw5dmM5z+r4HxVfTjc7no
N8Pt0PO0NEJUQ0RlY29kZWQgU2VjdXJpdHkgPHNlY3VyaXR5QHRoZWJpdGNvaW5j
b21tb25zLm9yZz6IkAQTFgoAOBYhBDOLDOSuVW69pncsUd40ZsPKNjdIBQJq+mKB
AhsDBQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJEN40ZsPKNjdI3y4BAKaPYH5+
NF2nvWJ7aU3zDIwHy2Do1Z/IyKUs5X6mvhxYAP4nUtFjWUM9YB4vCTV7dgv3Ef7m
cNj0nmYE8yY++dd2AA==
=643R
-----END PGP PUBLIC KEY BLOCK-----
```

### Upstream scope (summary)

In scope for Commons / BTCDecoded:

- Consensus and validation in `blvm-consensus`, `blvm-spec`, `blvm-spec-lock`, and frozen paths in `blvm-protocol` and `blvm-node`.
- Remote crash, denial of service, and memory safety in the node, RPC, and P2P stack.
- Authentication bypass on RPC; chainstate corruption after crash or reorg.

Out of scope for those reports:

- A third-party module you installed yourself, unless the node failed to confine it.
- Social engineering of operators.

This fork ships the `blvm` binary and release scripts inherited from upstream. Advisory JSON under `docs/security/advisories/` and metrics under `docs/security/METRICS.md` follow the upstream append-only record. Prefer reporting node bugs upstream so fixes land in Commons releases this fork can merge.

## Response targets (Quay)

These are targets for Quay-authored code, not a claim about past performance.

| Step | Target |
| --- | --- |
| Acknowledgement | 2 days |
| Triage | 7 days |
| Fix for dual-control or evidence integrity | 14 days after triage |
| Fix for allowlist or website secret exposure | 30 days after triage |
| Disclosure | When the fix is released, or sooner if actively exploited |

Upstream BLVM response targets remain those published by Bitcoin Commons in their security policy.
