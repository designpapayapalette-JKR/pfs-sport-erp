# AGENTS.md — PFS Sport ERP

Canonical rules for any human or AI agent working in this repository. `CLAUDE.md` at the
repo root defers to this file. `apps/web/AGENTS.md` (managed by Next.js tooling) covers
Next.js-specific conventions only — this file governs everything else.

See [docs/prd/PFS_Sport_ERP_MVP_PRD.md](docs/prd/PFS_Sport_ERP_MVP_PRD.md) for full product
requirements. This file only covers how agents should work, not what to build.

## Repository layout

```text
/apps
  /web                 # Next.js app (dealer portal, admin ERP, public lead form)
  /api                 # FastAPI app (business rules, RBAC, workflows, AI orchestration)
/packages
  /api-client          # Generated TypeScript client from apps/api/openapi.json
  /ui                  # Shared UI components and design tokens
  /config              # Shared lint/format config
/infra
  /railway             # Railway deploy config
  /aws                 # AWS resources (S3, future ECS)
/docs
  /prd                 # Product requirements
  /architecture         # Domain boundaries, auth, jobs, deployment
  /api                  # Generated OpenAPI contract
  /decisions             # Architecture Decision Records
  /runbooks              # Operational runbooks
/tests
  /e2e                 # Playwright end-to-end tests
```

## Commands

```bash
pnpm install              # install all JS workspaces
pnpm dev:web              # run Next.js dev server (apps/web)
pnpm build:web            # production build of apps/web
pnpm lint:web              # lint apps/web

cd apps/api && python3.11+ -m venv .venv && source .venv/bin/activate && pip install -e ".[dev]"
pnpm dev:api               # run FastAPI dev server with reload
pnpm test:api               # run FastAPI test suite (pytest)
```

Note: system Python may be older than 3.11 (this repo's `pyproject.toml` requires `>=3.11`).
Use `python3.11`, `python3.12`, or `python3.13` explicitly if `python3 --version` is older.

## Boundaries — what agents must NOT do

- No agent may silently change the PRD, database contract or permission model.
- Schema changes require a migration (Alembic) and a rollback note.
- API changes require regenerating `packages/api-client` and updating contract tests.
- Commercial calculations (pricing, tax, estimates) live only in `apps/api` — never in
  `apps/web`. The frontend displays results; it does not compute them.
- The LLM (`app/adapters/llm.py`) may draft and explain but never directly writes stock,
  prices, credit limits or order status. All structured AI outputs are validated against
  Pydantic schemas.
- Do not deploy to production or run destructive migrations without explicit human approval.
- Never place secrets, customer data, or production dumps in prompts or commits.
- Provider integrations (email, storage, LLM) go through the adapter interfaces in
  `apps/api/app/adapters/` — do not call ZeptoMail/S3/Kimi SDKs directly from route handlers
  or from `apps/web`.

## Definition of Done (per PRD §17.4)

A feature is complete only when:

1. Acceptance criteria pass.
2. API and UI permissions are enforced.
3. Unit/integration tests cover the main success and failure paths.
4. Relevant Playwright E2E flow passes.
5. Loading, empty and error states are implemented (UI work).
6. Audit event is added where required.
7. Documentation and OpenAPI are updated.
8. No critical/high security or accessibility issue remains.
9. Preview deployment is reviewed on desktop and mobile widths.

## Working style

- One domain/module per task where practical (e.g. dealers, orders, inventory).
- Work from small, testable tickets with explicit acceptance criteria.
- Generated code must pass formatter, linter, type checks, unit tests and relevant E2E tests
  before being considered done.
- Security-sensitive code (auth, RBAC, payments, pricing) requires human review.
