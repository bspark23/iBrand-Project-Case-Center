# Week 1 – Build the Projects Page Together

**Team:** Samuel, Tega, Righteous
**Lead / reviewer:** @bspark23
**Goal:** By the end of the week, the Projects page works with mock data. You can see all projects, open one, and create or edit one.

## How the page is shared

The Projects page has 3 parts. Each person owns one part.

```
            ┌──────────────────────────┐
            │  /projects               │   SAMUEL
            │  Project List            │   W1-01
            │  [+ New project]         │
            └────┬────────────────┬────┘
     click a card│                │click "+ New project"
                 ▼                ▼
┌──────────────────────┐   ┌──────────────────────┐
│ /projects/:id        │   │ /projects/new        │   RIGHTEOUS
│ Project Detail       │──▶│ /projects/:id/edit   │   W1-03
│ [Edit] [Publish]     │   │ Create / Edit Form   │
└──────────────────────┘   └──────────────────────┘
         TEGA  W1-02          click "Edit"
```

| Person | Task file (read this) | Page | Branch to create |
|--------|-------------------------|------|------------------|
| Samuel | [W1-01 Project List](W1-01-samuel-project-list.md) | `/projects` | `samuel/W1-01-project-list` |
| Tega | [W1-02 Project Detail](W1-02-tega-project-detail.md) | `/projects/:id` | `tega/W1-02-project-detail` |
| Righteous | [W1-03 Project Form](W1-03-righteous-project-form.md) | `/projects/new` and `/projects/:id/edit` | `righteous/W1-03-project-form` |

## Why you must work together

The parts connect, so you can't finish alone.

| Connection | Who must agree |
|------------|----------------|
| Samuel's list links to Tega's detail page (`/projects/:id`) | Samuel + Tega |
| Samuel's "+ New project" button opens Righteous's form | Samuel + Righteous |
| Tega's "Edit" button opens Righteous's form | Tega + Righteous |
| **StatusBadge** (the coloured status label) is built **once** by Samuel and used by all 3 | All 3 |
| **Project type and status names** (e.g. "Brand film", "Delivered") are written **once** by Righteous and used by all 3 | All 3 |
| `mock-data.json` is shared. Nobody changes it without telling the others | All 3 |

### Shared pieces (agree on these on Day 1)

| File | Owner | What it does |
|------|-------|--------------|
| `components/StatusBadge.jsx` | Samuel | Shows a status (`planning`, `active`, `delivered`, `archived`) as a coloured label |
| `labels.js` | Righteous | Turns codes into nice names: `brand_film` → "Brand film", `in_progress` → "In progress" |
| `useMockProjects.js` | Tega | One helper that reads `mock-data.json` and returns projects with their client attached |

All three files go in `frontend/src/modules/m1-projects/`. On Day 1, write down in [team-agreement.md](team-agreement.md) exactly how each one is used. For example: `<StatusBadge status="active" />`. Then everyone can build at the same time, even before the shared piece is finished.

## The week

| Day | What happens | Who |
|-----|--------------|-----|
| **Day 1** | **Kick-off call (30 min).** Read all 3 task files together. Fill in `team-agreement.md`. Pick who runs the end-of-week check-in | All 3 |
| Day 1–2 | **Think first.** In your task file: user flow, screen sketch, edge cases. Push it to your branch | Each person |
| Day 2 | **Build the shared pieces** first (StatusBadge, labels, useMockProjects), so others can use them | Owner of each |
| Day 2–4 | **Build your page** with AI help, using mock data | Each person |
| Day 3 | **Mid-week update** posted in GitHub Discussions (format below) | Each person |
| Day 4 | **Click-through test.** Pull all 3 branches and check every link and button works between pages. Post what broke | All 3 |
| Day 5 | **Review each other** (see review ring). Fix comments. Mark your PR "Ready for review" | All 3 |
| Day 5 | **Check-in** (15 min) run by the chosen person; notes posted in Discussions | All 3 |

**Deadline:** all 3 PRs ready for review by end of Day 5: ____________ (lead fills in date)

## Review ring

Each person reviews one teammate's PR and leaves at least **3 helpful comments** (questions count).

```
Samuel ──reviews──▶ Tega ──reviews──▶ Righteous ──reviews──▶ Samuel
```

The lead does the final review and merges.

## Communication rules

1. **Talk on GitHub, not only on WhatsApp.** Decisions made on WhatsApp must be written in the PR or in Discussions, or they don't count.
2. **Mention people.** Need something from Tega? Write `@tega-username` in a comment.
3. **Stuck for more than 1 hour?** Ask the team. Stuck for more than half a day? Tell the lead.
4. **Going to miss the deadline?** Say so at least 2 days before, in your PR.
5. **Changing a shared piece?** Tell the other two first and get a 👍 from both.

### Mid-week update format (post in Discussions → "Week 1")

```
**Name:**
**Done so far:**
**Doing next:**
**Blocked by / need help with:**
**Question for the team:**
```

## How to start your task

1. Get the latest code:
   ```
   git checkout main
   git pull
   ```
2. Create your branch (the name is at the top of your task file):
   ```
   git checkout -b samuel/W1-01-project-list
   ```
3. Do the work. Write your answers in **your own task file** and tick the boxes as you go.
4. Commit and push:
   ```
   git add .
   git commit -m "W1-01: add user flow and sketch"
   git push -u origin samuel/W1-01-project-list
   ```
5. On GitHub, open a **draft pull request** from your branch. Title: `[W1-0X] Your page – Your name`. Push often; the PR updates by itself.
6. When every box in your task file is ticked, click **"Ready for review"**.

More help: [How we work on GitHub](../../04-how-we-work-on-github.md)

## Done when (whole team)

- [ ] `/projects` shows all 6 mock projects with status badges
- [ ] Clicking a project opens its detail page
- [ ] "+ New project" and "Edit" open the form
- [ ] The three shared pieces exist and are used by every page
- [ ] `team-agreement.md` is filled in
- [ ] 3 PRs reviewed by a teammate (3+ comments each) and by the lead
- [ ] Mid-week updates and check-in notes posted
