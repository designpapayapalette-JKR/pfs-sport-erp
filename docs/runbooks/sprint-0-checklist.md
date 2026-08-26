# Sprint 0 Checklist (Week 1) — Foundation

Derived from PRD §19.1 (Sprint 0 focus: repositories, design tokens, environments, auth
architecture, database baseline, CI/CD, seed strategy) and §22.2 (decisions needed before
Sprint 1 ends).

## Repo & tooling

- [x] Monorepo structure created (`apps/web`, `apps/api`, `packages/*`, `infra/*`, `docs/*`,
      `tests/e2e`).
- [x] Next.js app scaffolded (TypeScript, Tailwind, App Router, ESLint).
- [x] FastAPI app scaffolded (health endpoints, config, DB session, adapter interfaces for
      LLM/email/storage).
- [x] pnpm workspace + root scripts.
- [x] `AGENTS.md` / `CLAUDE.md` at repo root.
- [x] `.env.example` for both apps.
- [x] Design tokens stub in `packages/ui`.
- [ ] CI pipeline (lint, type check, unit tests) for both apps — GitHub Actions or equivalent.
- [ ] Pre-commit hooks (ruff/mypy for API, eslint/prettier for web).

## Environments

- [ ] Vercel project linked to `apps/web`.
- [ ] Railway project + Docker setup for `apps/api`.
- [ ] NeonDB project created; pooled + direct connection strings captured.
- [ ] AWS S3 bucket provisioned (region, retention, CORS for signed uploads).
- [ ] ZeptoMail account + sender domain verified.
- [ ] Kimi API credentials obtained and stored as secrets (never in repo).

## Database baseline

- [ ] Alembic initialized in `apps/api`.
- [ ] Initial migration: identity/access tables (`users`, `roles`, `permissions`,
      `user_roles`, `sessions`, `invites`) per PRD §13.1.
- [ ] Seed script skeleton per PRD §18.3.

## Auth architecture

- [ ] Decide session strategy (cookie-based JWT vs opaque token + Redis/DB session) —
      document as an ADR in `docs/decisions/`.
- [ ] RBAC model: roles/permissions enforced in both API and UI per FR-AUTH-05.

## Decisions needed before Sprint 1 ends (PRD §22.2)

1. [ ] Final PFS product/SKU hierarchy and units of measure.
2. [ ] Warehouse/location list and who owns stock updates.
3. [ ] Dealer tier pricing and territory rules.
4. [ ] Order approval, cancellation and reservation expiry policies.
5. [ ] GST display/calculation requirements for the MVP.
6. [ ] Final lead score threshold and territory assignment rules.
7. [ ] ZeptoMail sender domain, addresses and approved email templates.
8. [ ] Kimi API endpoint, credentials, data-processing terms and model identifier.
9. [ ] S3 bucket region, retention and file-size/type limits.
10. [ ] Pilot user list and data migration templates.

## Exit criteria

Sprint 0 is done when a developer can clone the repo, run `pnpm install`, start both
`pnpm dev:web` and `pnpm dev:api` against a real NeonDB branch, and see a working health
check end to end — with CI green and the auth architecture decision recorded.
