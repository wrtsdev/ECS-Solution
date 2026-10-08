# PROGRESS.md

Updated by the agent at the end of every session. A fresh session reads this after `CLAUDE.md`.

## Current phase
Phase 0 (not started)

## Hosting target
`TBD` (managed Node.js or VPS; set by the user before Phase 0 ends)

## Phase status

| Phase | Name | Status | Commit | Notes |
| --- | --- | --- | --- | --- |
| 0 | Stack spike and ADR | not started | | |
| 1 | Stabilize, data model, adapters | not started | | |
| 2 | Auth, RBAC, tenancy, audit, methodology versioning | not started | | |
| 3 | Characterize | not started | | |
| 4 | Act | not started | | |
| 5 | Steer | not started | | |
| 6 | Track | not started | | |
| 7 | Validation Lab | not started | | |
| 8 | Imports, exports, evidence storage, a11y, security, perf | not started | | |
| 9 | Deployment hardening and docs | not started | | |

## Verified commands (fill in during Phase 0)

| Step | Command | Last result | Date |
| --- | --- | --- | --- |
| format | | | |
| lint | | | |
| test | | | |
| e2e | | | |
| build | | | |

## Open decisions (see DECISIONS.md)
- Confirm 5.1 proposals in CLAUDE.md (recovery-rate denominator, direct vs share precedence, double-counting rules, period normalization)

## Known defects and risks
(none recorded)

## Audit-trail proof log
One entry per phase: which executive metric was reproduced from source records, and where the evidence is.

## Release blockers still open
Identity/OIDC, session expiry and revocation, evidence retention and deletion, encrypted object storage, backups and tested restore, monitoring, independent security review.
