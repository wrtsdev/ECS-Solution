# Phase 0: Baseline audit and stack decision

Read `CLAUDE.md` and `PROGRESS.md` first. Do not build features in this phase.

## Goal
Establish what actually exists and decide, with evidence, whether the app can run on a standard Node runtime with PostgreSQL for the chosen Hostinger target. Output is an ADR and a verified baseline, not product changes.

## Inputs you need from the user
- Hostinger target: **managed Node.js** or **VPS**. If `PROGRESS.md` says TBD, ask once and stop.

## Tasks

1. **Orient.** Read `AGENTS.md`/`CLAUDE.md` if present, `README.md`, `package.json`, schema and migrations, domain logic, API routes, UI shell, forms, and tests. Do not modify anything under `docs/source/`.
2. **Verify the claimed starting point.** For each claim below, mark confirmed, partly true, or false, with a file reference. Trust the tested code over the claim.
   - Stack: React 19, TypeScript, Vinext/Vite, Tailwind, shadcn/Base UI, Recharts, Drizzle, Cloudflare Workers, D1.
   - Tenant-scoped snapshot store with optimistic concurrency, immutable history, SQL immutability triggers, append-only audit.
   - Views: Portfolio, Assessment Overview, Characterize, Act, Steer, Track, Validation Lab, Methodology, Audit Trail.
   - Golden data: 4,800 / 900 / 560 / 392 / 348 / 280.
   - Test coverage listed in the original brief (formulas, gates, roles, tenancy, exports, concurrency, versioning, CAST flow).
3. **Baseline run.** Run install, format, lint, tests, and the production build. Record exact commands and results in `PROGRESS.md`. If the baseline fails, diagnose and report. Do not "fix" by weakening tests.
4. **Browser inspection.** Using Playwright (or state the tool you chose), open the app at desktop (1440 px) and mobile (390 px). Log broken links, dead controls, incomplete forms, console errors, horizontal overflow, and keyboard or accessibility failures. Save to `docs/audit/baseline-ui.md`.
5. **Stack spike (time-boxed).** In a throwaway branch, answer these with evidence:
   - Does the build produce output that runs under `node` without Cloudflare-only APIs? List every Cloudflare/Vinext-specific import or binding (D1, env bindings, Workers APIs) and where it is used.
   - Can the Drizzle layer target PostgreSQL with the existing schema and migrations? What breaks (SQLite triggers, types, JSON handling, concurrency semantics)?
   - Can the immutability and append-only guarantees be reproduced in PostgreSQL (triggers or constraints)?
   - Estimate the smallest viable migration if Vinext cannot run on Node. Only recommend a framework change if the spike shows an exact incompatibility.
6. **Write the ADR** at `docs/adr/0001-runtime-and-persistence.md`: decision, options considered, evidence from the spike, consequences, and the migration plan with phase placement. Add any spec-versus-code differences to `DECISIONS.md`.
7. **Checklist.** Write an implementation checklist ordered by user impact and product risk. Put it in `PROGRESS.md`.

## Constraints
- No product features, no schema changes on the main branch, no deployment, no cloud resources.
- Discard the spike branch or keep it clearly named; do not merge it.

## Definition of done
- `PROGRESS.md` has verified commands with real results, the claim-verification table, the checklist, and the hosting target.
- ADR 0001 is written and states one decision.
- `docs/audit/baseline-ui.md` exists.
- Everything committed on a clean branch; no build artifacts or local DB files in Git.

## Report back (brief)
Claims confirmed or false, baseline results, the stack decision and why, and anything that needs the user's input before Phase 1.
