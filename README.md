# PFS Sport ERP

Responsive B2B ERP, dealer portal, CRM-lite, catalogue and automation platform for PFS Sport.
See the full product spec at
[docs/prd/PFS_Sport_ERP_MVP_PRD.md](docs/prd/PFS_Sport_ERP_MVP_PRD.md).

Agent working rules live in [AGENTS.md](AGENTS.md).

## Stack

| Layer | Technology |
|---|---|
| Web/PWA | Next.js + TypeScript (`apps/web`) |
| API | FastAPI + Python 3.11+ (`apps/api`) |
| Database | NeonDB PostgreSQL |
| Email | ZeptoMail |
| File storage | AWS S3 |
| LLM | Kimi K2.6+ via an internal provider adapter |
| Frontend hosting | Vercel |
| Backend hosting | Railway (MVP) → AWS (scale) |

## Getting started

### Prerequisites

- Node.js 20+, pnpm 10+
- Python 3.11+ (check with `python3.11 --version`; the repo's `pyproject.toml` requires it)
- A NeonDB Postgres connection string

### Install

```bash
pnpm install
```

### Web app

```bash
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web
```

### API

```bash
cd apps/api
python3.11 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, etc.
cd ../..
pnpm dev:api
```

### Tests

```bash
pnpm test:api
```

## Repository layout

See [AGENTS.md](AGENTS.md#repository-layout).

## Status

Greenfield scaffold. See [docs/runbooks/sprint-0-checklist.md](docs/runbooks/sprint-0-checklist.md)
for the current Sprint 0 punch list and [docs/architecture/README.md](docs/architecture/README.md)
for architecture notes.
