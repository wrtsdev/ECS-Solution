# Phase 1: Stabilize, data model, adapter boundaries

Read `CLAUDE.md`, `PROGRESS.md`, and `docs/adr/0001-runtime-and-persistence.md` first. Phase 0 must be complete. If it is not, stop.

## Goal
Make the current app solid and honest, then put the data model and persistence behind clean interfaces so later phases build on stable ground. Follow the ADR's persistence decision.

## Tasks (in order)

1. **Stabilize.** Work through the Phase 0 checklist and `docs/audit/baseline-ui.md`, highest user impact first:
   - Fix dead controls, broken links, incomplete forms, and console errors, or disable them with an explanation.
   - Make major views addressable by real URLs (or tested query params) that survive reload, including the selected assessment.
   - Fix horizontal overflow and clipped charts at 390, 768, and 1440 px.
   - Add a regression test for each meaningful defect fixed.
2. **Confirm 5.1 decisions.** Turn each proposal in `CLAUDE.md` section 5.1 into a `DECISIONS.md` entry. If the user has not confirmed one, implement the proposed behavior and mark it "provisional".
3. **Data model.** Ensure each entity exists explicitly (normalized tables on the production path, or rigorously typed records if the ADR keeps a bounded prototype): Tenant, User, TenantMembership, Assessment, MethodologyVersion, OrgUnit, RoleContext, Workflow, Activity, EvidenceItem, CapacityMeasurement, LeakageFinding, RecoveryOpportunity, RecoveryMeasurement, RedeploymentAllocation, OutcomeMetric, ReviewDecision, AuditEvent, ModelEvaluation.
   - Stable IDs, timestamps, actor, record version, methodology version, parent revision link.
   - Lineage foreign keys along the chain in `CLAUDE.md` section 3, with tenant and assessment ownership enforced on each hop.
   - Migrations are forward-only and reproducible from an empty database. Seed data is deterministic.
4. **Adapter boundary.** Define a repository/persistence interface the domain and API depend on. The existing store (and PostgreSQL, if the ADR says so) implement it. Domain functions stay pure with no database imports.
5. **Domain gaps.** Implement or verify, with tests, the formulas and rules in `CLAUDE.md` sections 5 and 6 that are not yet covered. In particular:
   - zero denominators return undefined with an explanation;
   - recovery over 100 percent is preserved;
   - double-counting and period-mismatch rules from 5.1;
   - structured validation errors (field plus rule);
   - failed mutations leave state and audit untouched.
6. **Golden lock.** Confirm tests lock 4,800 / 900 / 560 / 392 / 348 / 280, plus the derived rates (348/392, 280/348) and that none are capped.

## Constraints
- Preserve working behavior and existing URLs where practical. No framework rewrite unless the ADR decided one, and then only the smallest migration it describes.
- No auth, RBAC, or tenancy rework yet (Phase 2), except fixing anything that is plainly unsafe.
- No deployment. No weakening of existing tests.

## Definition of done
- Format, lint, tests, e2e, and build all pass. Exact commands and results are recorded in `PROGRESS.md`.
- Migrations apply cleanly from empty, and the seed reproduces the golden dataset.
- Persistence interface exists and domain tests run without a database.
- **Audit-trail proof:** pick the 348-hour actual recovery figure. Reproduce it from its source records, and show the evidence items, method version, calculation, confidence, and reviewer decision. Record the steps in `PROGRESS.md`.
- Clean commit; no build artifacts, credentials, or local DB files in Git.

## Report back (brief)
What changed and why, commands with results, decisions made or provisional, remaining defects, and what Phase 2 needs from the user.
