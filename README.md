# iBrand Project & Case Center (IPCC)

One web app with two sides:

- **Internal Desk** – where iBrand staff and interns manage projects, tasks, equipment and media.
- **Client Portal** – where clients see their project progress and anyone (with permission) can browse finished work as case studies.

When a project is finished, staff click **"Publish as Case"** and it becomes a case study. No copying, no double work.

Everything is built by us. No outside APIs or paid services.

---

## Start here

Read these in order:

| # | File | What it tells you |
|---|------|-------------------|
| 1 | [Project overview](docs/01-project-overview.md) | What we are building and why, in plain words |
| 2 | [Team and modules](docs/02-team-and-modules.md) | Who owns which part |
| 3 | [Tasks](docs/03-tasks.md) | Every task, week by week |
| 4 | [How we work on GitHub](docs/04-how-we-work-on-github.md) | Branches, pull requests, using AI, deadlines |
| 5 | [Data model](docs/05-data-model.md) | The database tables |
| 6 | [API contract](docs/06-api-contract.md) | The list of backend endpoints |
| 7 | [Decisions log](docs/07-decisions.md) | Big choices we made and why |

## Run it

**With Docker (easiest):**
```
docker compose up --build
```

**Without Docker:** open two terminals.
```
cd backend
npm install
npm run dev
```
```
cd frontend
npm install
npm run dev
```

Then open:
- App: http://localhost:5173
- API docs: http://localhost:4000/api/docs

## Folder layout

```
ipcc/
├── backend/            Node.js + Express API (one server for everything)
├── frontend/           React app (Internal Desk + Client Portal)
│   └── src/modules/    One folder per module, owned by one person
├── docs/               All project documents
└── .github/            Pull request and issue templates
```

## Modules and owners

| Module | Owner |
|--------|-------|
| M1 Project Core & Shell | Engineer A (Lead) |
| M2 Task Board | Engineer B |
| M3 Equipment Registry | Engineer B |
| M4 Media Repository | Engineer C |
| M5 Case Library | Engineer C |
| M6 Share Links & Permissions | Engineer D |
| M7 Client Progress View | Engineer D |

Each module can run on its own with fake (mock) data, so each person can show their part even if the full project is not finished.
