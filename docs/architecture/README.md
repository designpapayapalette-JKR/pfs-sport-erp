# Architecture Notes

Living notes translating the PRD (`docs/prd/PFS_Sport_ERP_MVP_PRD.md`) into implementation
decisions. Add one file per topic as decisions firm up; record irreversible decisions as ADRs
in `docs/decisions/`.

## Logical components (PRD §12.3)

```text
Browser / PWA
    |
    v
Next.js on Vercel
    |
    v
FastAPI REST API on Railway/AWS
    |------ NeonDB PostgreSQL
    |------ AWS S3
    |------ ZeptoMail
    |------ Kimi LLM Gateway
    `------ Worker / Scheduler
```

## Architecture rules (PRD §12.4)

- Next.js never contains authoritative commercial calculations.
- FastAPI owns authorization, validation, price calculation, inventory reservation and
  workflow transitions.
- Database constraints protect uniqueness and valid relationships.
- Long-running work is queued (outbox/jobs table), not performed inside the user request.
- External webhooks are authenticated, stored, acknowledged quickly and processed
  asynchronously.
- REST for MVP; OpenAPI is the API contract; typed frontend clients are generated into
  `packages/api-client`.

## Domain modules (modular monolith, one FastAPI app)

Planned module boundaries inside `apps/api/app/`, one directory per domain as they're built:
auth, dealers, catalogue (products/CMS), pricing, inventory, orders, finance (quotes/invoices/
payments), shipments, crm (leads), estimator, visualiser, documents, notifications,
automations, reports, audit, settings.

Each module owns its own models, schemas, services and API routes; cross-module access goes
through service functions, not direct ORM queries into another module's tables.

## Open items to document here as decided

- Auth/session strategy (cookie-based JWT vs opaque session token) — see PRD FR-AUTH-*.
- Automation engine job/outbox schema — see PRD §10.
- Rate card / pricing versioning approach — see PRD FR-PRC-*.
- Kimi LLM gateway contract (request/response schema, guardrails enforcement point) — see
  PRD §11.
