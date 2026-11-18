# 1. Project Overview

## The problem

Right now iBrand's work is spread across WhatsApp chats, personal drives and people's memory.

- When an intern leaves, their work and knowledge leave with them.
- We have lots of finished work but no clean way to show it to new clients.
- Clients don't know how their project is going, so they keep asking.
- A finished project and a case study are the same thing, but we keep them separately.
- In a team project, it is hard to show who did what.

## The solution

| Problem | How IPCC fixes it |
|---------|-------------------|
| Knowledge leaves with people | Each module is a separate piece of work that its owner can show on their own |
| No portfolio | Finished projects become case studies in a public library |
| Clients can't see progress | Clients get a read-only progress page |
| Double work | One button: "Publish as Case" |
| Can't see who did what | Each module has one owner |

## How it is built (architecture)

We are building a **modular monolith**. That means:

- **One backend server** holds all the endpoints and talks to **one database**.
- **The frontend is split into modules.** Each person builds their module separately.
- Everyone builds against the **same API contract** (the list of endpoints), written **before** any code.

Why not many small services (microservices)? We are 4 people. One server is easier to run, test and fix.

```
            ┌───────────────────┐     ┌────────────────────┐
            │  Internal Desk    │     │  Client Portal     │
            │  (staff, interns) │     │  (clients, public) │
            └─────────┬─────────┘     └──────────┬─────────┘
                      └────────────┬─────────────┘
                                   ▼
                         ┌───────────────────┐
                         │  One backend API  │
                         └─────────┬─────────┘
                                   ▼
                    ┌─────────────────────────────┐
                    │ PostgreSQL + local file disk │
                    └─────────────────────────────┘
```

**The golden rule:** the API contract comes first. Nobody builds against an endpoint that is not written in [the API contract](06-api-contract.md).

## Tech stack

| Part | We use | Why |
|------|--------|-----|
| Frontend | React (with Vite) | Popular, easy to learn, AI tools know it well |
| Backend | Node.js + Express | Same language (JavaScript) as the frontend |
| Database | SQLite to start, PostgreSQL later | SQLite needs no setup; Postgres for the real thing |
| Files (images, videos) | Saved on our own server disk | No outside storage service |
| Login | Our own JWT + bcrypt | No Google/Auth0 login |
| API document | OpenAPI (Swagger) | One clear list of endpoints for everyone |
| Running it | Docker Compose | Same setup on every computer |
| Code sharing | Git + GitHub | Branches and pull requests |

> These choices are final once Week 1 ends. See [decisions log](07-decisions.md).

## The 5 phases

| Phase | Weeks | What happens |
|-------|-------|--------------|
| 0 – Foundation | Week 1 | Agree on database tables and endpoints. Set up the repo. No feature code. |
| 1 – Spine | Weeks 2–3 | Lead builds login, app shell and projects. Others design their modules and make mock data. |
| 2 – Build modules | Weeks 4–7 | Everyone builds their module at the same time. Test together every 2 weeks. |
| 3 – Join & check | Week 8 | Connect all modules. Check security and permissions. |
| 4 – Launch & demo | Week 9 | Go live. Each person practises demoing their module. |

## Security in simple words

- Passwords are scrambled (bcrypt). We never store real passwords.
- Login tokens (JWT) expire quickly.
- Share links use random tokens that can't be guessed, and can have a password and an expiry date.
- Clients never receive internal data (tasks, equipment, notes). The **backend** removes it, not just the screen.
