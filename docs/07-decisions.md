# 7. Decisions Log

Every big choice gets written here, so new people understand **why** things are the way they are. Anyone can propose a decision in a PR. The lead approves.

## Template

```
## D-XXX: Title
**Date:**
**Decided by:**
**Status:** Proposed / Accepted / Replaced by D-YYY

**The question:** What did we need to decide?
**Options we looked at:**
1. Option A – good: … / bad: …
2. Option B – good: … / bad: …
**What we chose and why:**
**What this means for us:**
```

---

## D-001: One server (modular monolith), not microservices
**Decided by:** Lead
**Status:** Accepted

**The question:** Should the backend be one server or many small ones?
**Options:**
1. Many small services – good: each part can grow on its own / bad: too much setup and running work for 4 people
2. One server split into modules – good: simple to run, test and deploy / bad: everything is deployed together
**Chosen:** Option 2. We are a small team, and one API contract keeps everyone in sync.
**What this means:** One backend folder, one database. Each feature is a folder in `backend/src/modules/`.

## D-002: Tech stack
**Decided by:** Lead
**Status:** Accepted

**The question:** Which languages and tools do we use?
**Options:**
1. React + Node.js/Express – good: JavaScript everywhere, AI tools know it very well, huge community / bad: less structure out of the box
2. Vue + Python FastAPI – good: FastAPI checks inputs for us / bad: two languages for a team that is new to coding
**Chosen:** Option 1. One language for frontend and backend means less to learn.
**What this means:** React (built with Vite) in `frontend/`, Node.js 22 + Express in `backend/`. We don't switch later.

## D-003: Start with SQLite, move to PostgreSQL
**Decided by:** Lead
**Status:** Accepted

**The question:** Which database?
**Options:**
1. PostgreSQL from day one – good: same as production / bad: more setup on every laptop
2. SQLite first, PostgreSQL before launch – good: zero setup, one file / bad: one move later
**Chosen:** Option 2. Database code goes through one layer (`backend/src/db/`), so the move only touches that folder.
**What this means:** Don't write SQLite-only tricks. Move to PostgreSQL in Phase 3.

## D-004: API contract lives in OpenAPI
**Decided by:** Lead
**Status:** Accepted

**The question:** Where is the "real" list of endpoints?
**Chosen:** `backend/openapi.yaml`. When the backend runs, it is readable at http://localhost:4000/api/docs. `docs/06-api-contract.md` is the short, easy-to-read version.
