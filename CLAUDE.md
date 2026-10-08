# CLAUDE.md: ECS Validation Platform (QTR Foundry)

This file holds the stable rules for every session. Phase-specific tasks live in `prompts/`. Current state lives in `PROGRESS.md`. Read this file, then `PROGRESS.md`, then the prompt you were given.

## 1. What this is, and what it is not

An MVP that makes the **QTR CAST Method** executable, auditable, repeatable, and testable:

**Characterize -> Act -> Steer -> Track** (legacy names: Find, Free, Aim, Manage)

It is a **demonstration and pilot foundation using synthetic data**. It is not approved for real client data. Never make unsupported scientific, security, or production-readiness claims in the UI, docs, exports, or code comments. Label all demo data as synthetic in the UI and in every export.

Do not build: employee rankings, covert productivity surveillance, a universal value score, autonomous diagnosis, opaque recommendations, or causal language the measurement design does not support.

## 2. Instruction precedence

1. The user's latest instruction.
2. This file.
3. The existing repository (code, migrations, seed data, tests, README). Trust tested code over claims in any prompt. Where they differ, record the difference in `DECISIONS.md`. Do not silently resolve it.
4. Reference specs in `docs/source/` are read-only. Never modify them.

Preserve working behavior. Extend incrementally. Do not rewrite the stack because a different one is familiar.

Claims in prompts about the private demo URL or the hosting plan are **unverified**. Do not rely on them.

## 3. Canonical chain

**capacity consumption -> leakage -> expected recovery -> actual recovery -> redeployment -> outcome/value**

Each stage is a separate record with its own evidence gate. Never infer one stage from the prior one:

- Consumed capacity is not leakage.
- Leakage is not automatically recoverable.
- Predicted recovery is not actual recovery.
- Recovered capacity is not redeployed capacity.
- Redeployment is not value.

Required lineage: `EvidenceItem -> CapacityMeasurement -> LeakageFinding -> RecoveryOpportunity -> RecoveryMeasurement -> RedeploymentAllocation -> OutcomeMetric`. Every material executive number, classification, recommendation, and conclusion must expose source evidence, method, methodology version, confidence, review status and reviewer decision, and audit history. Every executive claim needs a navigable path back to evidence.

## 4. Taxonomies (methodology v1.0)

Capacity lenses: Structural, Work, Decision, Leadership, Workforce, Coordination, Technology.
Leakage types: Structural (role ambiguity), Process (duplication, rework), Decision (slow approvals), Leadership (reprioritization overload), Talent (low-value work), Coordination (meetings, status chasing), Technology (underused tools).
Recovery levers: Automate, Augment, Redesign, Eliminate.

## 5. Measurement contract (v0.1)

```text
available in-scope capacity = sum(FTE_or_role_equiv * workable_hours_in_period * in_scope_share)
activity consumption        = (volume * avg_touch_time) + recurring_fixed_burden
leakage impact              = directly_measured_avoidable_burden
                              OR activity_consumption * validated_avoidable_share
expected recoverable cap.   = leakage_impact * expected_removal_effectiveness
actual recovery (normalized)= expected_baseline_burden_at_post_period_volume - observed_post_period_burden
recovery rate               = actual_recovered / expected_recoverable      (see 5.1)
redeployment rate           = verified_redeployed / actual_recovered
```

Rules:
- Never silently cap rates at 100 percent. Overperformance stays visible.
- A zero denominator yields **undefined**, with an explanation. Never zero, never a fabricated score.
- Keep touch time, wait time, fixed burden, volume-driven burden, period, and unit separate.
- Every quantified record needs unit, period, method, at least one evidence link, and confidence (High/Medium/Low), plus low/expected/high ranges where applicable. Confidence is distinct from importance and is always shown next to scores.
- Outcomes stay in native units. Never convert unlike outcomes into one score.
- Every outcome conclusion carries an attribution level: **A** strong/direct operational attribution; **B** plausible contribution supported by triangulation; **C** association only. Wording must match the level. Claim causality only where the design supports it.

### 5.1 Proposed decisions (confirm in DECISIONS.md before relying on them)

- "Identified recoverable" in the recovery rate means **expected recoverable capacity** (the golden data implies 348 / 392). Say so wherever the rate is displayed.
- **Direct vs share-based leakage:** when both exist, the direct measurement is the official value. Store the share-based figure as a cross-check and flag the variance for the reviewer.
- **Double counting:** the sum of leakage findings against one activity must not exceed that activity's consumption unless an overlap is explicitly declared with a rationale. A recovery opportunity's expected recovery must not exceed the combined impact of its linked validated findings. One finding's impact may be claimed by more than one opportunity only through an explicit declared split.
- **Period alignment:** baseline, post-measurement, and allocation records compare only in matching units. Different period lengths require an explicit normalization method recorded on the record. Otherwise it is a validation error.

## 6. State gates (enforced in the domain layer and API, never only in forms)

- A quantified baseline is invalid without unit, period, method, confidence, and evidence.
- A LeakageFinding cannot be validated without a baseline and workflow context.
- A RecoveryOpportunity cannot be approved without one or more validated findings.
- Expected recovery stores low/expected/high and records assumptions.
- Approved opportunities must have a measurement plan before implementation begins.
- Actual recovery requires a baseline comparison, a post-measurement window, volume-normalization inputs, method, confidence, and evidence.
- Redeployment cannot exceed verified recovered capacity in the matching unit and period unless a Client Executive Sponsor records an explicit override rationale.
- Pending allocations reserve capacity. Concurrent allocations must not spend the same pool.
- An allocation requires destination, owner, intended outcome, period, and verification method.
- An OutcomeMetric requires baseline, current, target (or another explicit structure), a measurement window, evidence, and an attribution level.
- An outcome cannot be marked realized before its allocation is approved and verified.
- Validated records are immutable. A correction creates a new version linked to its parent. It never overwrites.
- Reject cross-tenant and cross-assessment references at every step.
- A failed mutation must not partly update state or append a misleading audit event (atomicity).
- Concurrent updates fail cleanly with an actionable conflict response. Rejected requests must be fully consumed so persistent connections stay healthy.
- Validation errors are structured: field plus violated rule.

## 7. Roles and permissions

Platform Admin, Lead Analyst, Reviewer/Methodology Lead, Client Executive Sponsor, Client SME/Process Owner, Read-only Auditor/Research Analyst. All permissions are enforced on the server.

- **Independence is enforced on actor identity, not role label.** The author of a record cannot approve it, even if they switch roles. In demo mode, seed distinct demo users per role so the rule is testable.
- Demo role switching is a labeled demonstration convenience, never presented as authentication.
- Internal reviewer notes and analyst-comparison data never appear in client views or exports unless explicitly published.

## 8. Audit and lineage

Audit all material creates, edits, submissions, approvals, rejections, methodology changes, overrides, imports, exports, and measurement changes (actor, time, record, version, methodology version, before/after reference). The audit log is append-only. A methodology publish never alters assessments locked to an older version.

Drill path from any executive metric: **aggregate -> workflow -> finding -> calculation -> evidence -> review decision -> methodology version.**

## 9. Security boundary (synthetic prototype)

- Tenant selection is server-controlled. Never trust a client-supplied tenant ID.
- Session cookies: cryptographically random, HttpOnly, Secure in production, SameSite. Validate Origin (or equivalent) on mutations.
- RBAC and tenant isolation on every API operation and every export.
- Validate sizes, types, taxonomies, file formats, and cross-record references. Rate-limit mutations and imports.
- Neutralize CSV/spreadsheet formula injection in every export (prefix cells beginning `= + - @`).
- Never log secrets, raw cookies, or evidence contents. No secrets in source control. Keep `.env.example` complete.
- Demo role switching and platform-gated access are not substitutes for OIDC, session administration, reviewer independence, retention policy, or security review.

**Release blockers for any live client pilot** (document if not implemented): named identity and tenant membership, OIDC, session expiry and revocation, evidence retention and deletion, encrypted object storage, backups with a tested restore, monitoring, independent security review.

## 10. Engineering rules

- Domain calculation functions are pure and separately testable. Persistence sits behind an interface so the database can be replaced without touching product logic.
- Stable IDs, timestamps, actors, record versions, methodology versions, parent revision links on every record.
- Every visible control works or is disabled with an explanation. No placeholder links or toast-only buttons.
- Major views have real URLs that survive reload.
- Accessibility: semantic headings, labeled inputs, keyboard-operable nav and dialogs, visible focus, no color-only meaning (CAST colors: Characterize navy, Act copper, Steer teal, Track gold, always with text and icons).
- Distinguish forecasts from measured results everywhere.
- Never weaken an existing test to make a change pass. Add a regression test for each meaningful defect fixed.
- No build artifacts, credentials, local DB files, or runtime state in Git.

## 11. Verification (run before every phase commit)

Record the exact commands and results in `PROGRESS.md`. Fill in the real commands once Phase 0 confirms them:

```text
format:   <cmd>
lint:     <cmd>
test:     <cmd>        # domain + API
e2e:      <cmd>        # browser journeys (Playwright, or the tool chosen in Phase 0)
build:    <cmd>
```

At the end of each phase, prove the audit trail: pick one executive metric and reproduce it from source records, showing evidence, method version, calculation, confidence, and reviewer decision.

Golden dataset (synthetic, hand-calculated, locked by tests): 4,800 available hours/month; 900 consumed; 560 validated leakage; 392 expected recovery; 348 actual recovery; 280 verified redeployment. Do not change these without a `DECISIONS.md` entry.

## 12. Stop conditions

Stop and ask the user when: a needed credential or account decision is missing; an external or irreversible action (deploy, cloud resource, destructive migration, force-push) is required; the baseline tests fail for a reason you cannot explain; a spec conflict affects a state gate or the golden numbers. Otherwise make a reasonable decision and record it in `DECISIONS.md`.

## 13. Phase map

0 Stack spike and ADR; 1 Stabilize, data model, adapters; 2 Auth, RBAC, tenancy, audit, methodology versioning; 3 Characterize; 4 Act; 5 Steer; 6 Track; 7 Validation Lab; 8 Imports, exports, evidence storage, accessibility, security, performance; 9 Deployment hardening and docs. Work one phase per session. Commit at the end of each. Update `PROGRESS.md`.
