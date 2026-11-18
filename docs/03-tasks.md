# 3. Tasks

Every task here becomes one **GitHub Issue**. The lead creates the issue, assigns it, and sets the deadline.

**How to read a task**

- **ID** – use it in the branch name and pull request title, e.g. `P0-03`.
- **Owner** – who does it. `A` = Lead, `B`, `C`, `D` = engineers, `All` = everyone does their own copy.
- **Due** – the week it must be finished (end of that week).
- **Done when** – how we know it is finished.

**Labels to create on GitHub:** `phase-0` `phase-1` `phase-2` `phase-3` `phase-4` `M1` … `M7` `design` `docs` `code` `review` `bug`

Fill in real dates once you know the start date:

| Week | Starts | Ends |
|------|--------|------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |
| 7 | | |
| 8 | | |
| 9 | | |

---

## Phase 0 – Foundation (Week 1)

> **Change:** In Week 1 the whole team builds the Projects page together (W1-01, W1-02, W1-03). See [Week 1 plan](tasks/week-1/README.md). The lead does the setup tasks below. P0-04 and P0-06 move to Week 2.

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P0-01 | Create GitHub repo, add these docs, protect the `main` branch (pull requests required, lead must approve) | A | W1 | Nobody can push straight to `main` |
| P0-02 | Create the GitHub Project board (columns: Backlog, To do, In progress, In review, Done) and all labels | A | W1 | Board and labels exist |
| P0-03 | Everyone: install Git, VS Code, Node.js, Docker; clone the repo; make a test pull request that adds your name to `docs/02-team-and-modules.md` | All | W1 | Each person has one merged PR |
| P0-04 | Read the data model. Each engineer writes 3 questions or problems they see in the tables for their module, as a comment on the issue | B, C, D | W1 | Questions posted and answered |
| P0-05 | Freeze the data model (update `05-data-model.md` with answers from P0-04) | A | W1 | Doc marked **FROZEN** |
| P0-06 | Read the API contract. Each engineer checks their module's endpoints: "Does my module have every endpoint it needs?" Post findings on the issue | B, C, D | W1 | Findings posted |
| P0-07 | Write the OpenAPI file (`backend/openapi.yaml`) from `06-api-contract.md` | A | W1 | File opens in Swagger editor with no errors |
| P0-08 | Set up empty backend + frontend + Docker Compose. `docker compose up` shows a blank page and a `/api/health` endpoint | A | W1 | Works on at least 2 team laptops |
| P0-09 | Write decision records for: tech stack, monolith vs microservices, SQLite → Postgres (in `07-decisions.md`) | A | W1 | 3 decisions written |

---

## Phase 1 – Spine & Design (Weeks 2–3)

The lead builds the spine. Engineers design their modules on paper first, then make mock data.

### Lead (M1)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P1-A01 | Database setup and migrations for all tables | A | W2 | Tables created with one command |
| P1-A02 | Auth: register, login, `/me`, password hashing, JWT | A | W2 | Can log in and get a token |
| P1-A03 | Role check middleware (intern, staff, admin, client) | A | W2 | Wrong role gets `403` |
| P1-A04 | Clients endpoints (list, create, update) | A | W3 | Endpoints match contract |
| P1-A05 | Projects endpoints (list, create, detail, update) | A | W3 | Endpoints match contract |
| P1-A06 | Publish / unpublish project (only when status = delivered) | A | W3 | Can't publish a project that isn't delivered |
| P1-A07 | Frontend shell: login page, side menu, routing, empty slot for each module | A | W3 | Each module has a page that loads |
| P1-A08 | Project list and project detail pages | A | W3 | Can create and view a project |
| P1-A09 | Seed script with sample users, clients and projects | A | W3 | One command fills the database |

### Engineers (one copy of each task per module)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P1-02 | **User flow:** write step by step what the user does in your module (e.g. "1. Staff opens project 2. Clicks Tasks tab 3. …") | B, C, D | W2 | `docs/modules/<module>.md` has a User Flow section |
| P1-03 | **Screen sketches:** draw each screen (paper photo, Figma, or Excalidraw). Label every button and field | B, C, D | W2 | Images added to `docs/modules/` |
| P1-04 | **Architecture diagram:** draw how your module talks to the backend: which screen calls which endpoint, and which table it reads/writes | B, C, D | W2 | Diagram in your module doc |
| P1-05 | **Edge cases:** list at least 8 things that can go wrong and what should happen (e.g. "upload is 2GB", "share link expired", "two people drag the same card") | B, C, D | W3 | Edge Cases section with 8+ items |
| P1-06 | **Mock data:** create `mock-data.json` for your module that matches the data model exactly | B, C, D | W3 | Lead approves it matches the tables |
| P1-07 | **Design review:** present your design (10 min) in the team meeting. Get feedback from the others | B, C, D | W3 | Feedback written in the PR |
| P1-08 | **Review a teammate:** review one other engineer's design PR and leave at least 3 useful comments | B, C, D | W3 | 3+ comments left |

---

## Phase 2 – Build Modules (Weeks 4–7)

Engineers build the screens using AI, following their own design. The lead builds the backend endpoints for each module and reviews every PR.

### Backend for modules (Lead)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-A01 | Tasks endpoints (list, create, update status/position, delete) | A | W4 | Match contract |
| P2-A02 | Equipment endpoints + PDF export | A | W5 | PDF downloads |
| P2-A03 | Storage interface (save/read/delete file on disk) + media upload, list, delete | A | W5 | Can upload an image |
| P2-A04 | Thumbnail creation for images and videos | A | W6 | Thumbnails appear |
| P2-A05 | Public cases endpoints (list with filters, detail) | A | W5 | Only published projects show |
| P2-A06 | Share links: create, resolve, password check, expiry | A | W6 | Expired link is rejected |
| P2-A07 | Client progress endpoint with internal fields removed | A | W6 | Response has no tasks/equipment/notes |
| P2-A08 | Intern scope: interns only see projects they are assigned to | A | W7 | Tested with an intern account |

### M2 – Task Board (Engineer B)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-B01 | Board with 3 columns showing cards from mock data | B | W4 | Board shows mock tasks |
| P2-B02 | Drag and drop cards between and inside columns | B | W5 | Order and status change on screen |
| P2-B03 | Filter by assignee; highlight due-soon (yellow) and late (red) | B | W5 | Filters work |
| P2-B04 | Create / edit / delete task form | B | W6 | Form works with mock data |
| P2-B05 | Switch from mock data to the real API | B | W7 | Works against backend |

### M3 – Equipment Registry (Engineer B)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-B06 | Checklist page: item, quantity, tick box, notes | B | W5 | Shows mock items |
| P2-B07 | Add / edit items, tick and untick | B | W6 | Works with mock data |
| P2-B08 | "Export PDF" button | B | W6 | Button downloads the file |
| P2-B09 | Switch to real API | B | W7 | Works against backend |

### M4 – Media Repository (Engineer C)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-C01 | Gallery grid showing thumbnails from mock data | C | W4 | Gallery shows |
| P2-C02 | Upload area (drag file or click), progress bar, file type and size check | C | W5 | Wrong file type shows an error |
| P2-C03 | Add / remove tags, filter gallery by tag and type | C | W6 | Tag filter works |
| P2-C04 | Full-size preview for image, video, document | C | W6 | Preview opens |
| P2-C05 | Switch to real API | C | W7 | Works against backend |

### M5 – Case Library (Engineer C)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-C06 | Case list page with cards | C | W4 | Shows mock cases |
| P2-C07 | Search box + filters (client, type) | C | W5 | Filters work together |
| P2-C08 | Case detail page with media gallery and description | C | W6 | Page shows |
| P2-C09 | Brand theming from client `brand_colors` | C | W6 | Colours change per client |
| P2-C10 | Switch to real API | C | W7 | Works against backend |

### M6 – Share Links & Permissions (Engineer D)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-D01 | "Create share link" form: target, optional password, optional expiry | D | W4 | Form works with mock data |
| P2-D02 | List of my share links with copy button and status (active/expired) | D | W5 | List shows |
| P2-D03 | Password page shown when opening a protected link | D | W5 | Wrong password shows error |
| P2-D04 | "Link expired" and "Link not found" pages | D | W6 | Both pages exist |
| P2-D05 | Write the permission table: which role can see which page and data (`docs/modules/permissions.md`) | D | W6 | Lead approves |
| P2-D06 | Switch to real API | D | W7 | Works against backend |

### M7 – Client Progress View (Engineer D)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-D07 | Progress page: project title, status steps (planning → active → delivered), dates | D | W5 | Page shows mock project |
| P2-D08 | Client logo and brand colours on the page | D | W6 | Branding shows |
| P2-D09 | Works well on a phone screen | D | W6 | Checked on a phone |
| P2-D10 | Switch to real API | D | W7 | Works against backend |

### Every engineer, every module

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P2-01 | Module README: what it does, how to start it with mock data, screenshots | B, C, D | W6 | README merged |
| P2-02 | Assembly test #1: run your module against the real backend, write down what breaks | All | W5 | Results posted on the issue |
| P2-03 | Assembly test #2: same again | All | W7 | Results posted |
| P2-04 | Fix every problem found in your module's assembly tests | B, C, D | W7 | Issues closed |
| P2-05 | Run the weekly check-in once (see GitHub guide) | B, C, D | W7 | Notes posted in Discussions |

---

## Phase 3 – Join & Check (Week 8)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P3-01 | All modules connected in the main app | A | W8 | Every module opens from the menu |
| P3-02 | Permission audit: log in as each role, try to open every page and endpoint, record results | D (lead), All | W8 | Table filled, no leaks |
| P3-03 | Share link security check: guess tokens, expired links, wrong passwords | D | W8 | All rejected |
| P3-04 | Test full flow: create project → tasks → media → deliver → publish → see in case library | B | W8 | Works end to end |
| P3-05 | Test upload limits and large galleries (100+ files) | C | W8 | Page still loads fast |
| P3-06 | Fix bugs found in Phase 3 | All | W8 | No open `bug` issues marked high |

---

## Phase 4 – Launch & Demo (Week 9)

| ID | Task | Owner | Due | Done when |
|----|------|-------|-----|-----------|
| P4-01 | Deploy to the iBrand server | A | W9 | Live URL works |
| P4-02 | Write the full demo script | A | W9 | `docs/demo-script.md` merged |
| P4-03 | Write your module's demo script (5 minutes, standalone) | B, C, D | W9 | Added to module README |
| P4-04 | Rehearse your demo in front of the team | B, C, D | W9 | Done in meeting |
| P4-05 | Write a short "what I built and learned" page for your portfolio | B, C, D | W9 | `docs/modules/<module>.md` updated |
