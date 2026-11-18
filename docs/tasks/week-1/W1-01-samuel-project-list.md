# W1-01 – Project List page

**Owner:** Samuel
**Reviewed by (teammate):** Righteous
**Your branch (you create it):** `samuel/W1-01-project-list`
**Page:** `/projects`
**Main file:** `frontend/src/modules/m1-projects/pages/ProjectListPage.jsx`
**You also own:** `frontend/src/modules/m1-projects/components/StatusBadge.jsx` (used by everyone)
**Due:** end of Day 5

## Before you push: create your own branch
Never push to `main`. Create **your own branch** first, and do all your work on it.

1. Get the latest code:
   ```
   git checkout main
   git pull
   ```
2. Create your branch (only once, at the start):
   ```
   git checkout -b samuel/W1-01-project-list
   ```
3. Each time you want to save and share your work:
   ```
   git add .
   git commit -m "W1-01: what you did"
   git push -u origin samuel/W1-01-project-list
   ```
4. The first time you push, open a **draft pull request** on GitHub from your branch.
   - Title: `[W1-01]  - Samuel`
   - Write `Task: docs/tasks/week-1/W1-01-samuel-project-list.md` in the description
5. Keep pushing to the same branch. The PR updates by itself.
6. When every box in this file is ticked, click **"Ready for review"**.

> Not sure which branch you're on? Run `git branch`. The one with `*` is yours. If it says `main`, switch with `git checkout samuel/W1-01-project-list`.

## What this page does
This is the first page staff see when they open Projects. It shows all projects as cards or rows, and lets you search and filter them.

## Part 1 – Think first (Day 1–2)
Write your answers in the sections at the bottom of this file.

- [ ] **User flow:** write the steps a staff member takes on this page, from opening it to clicking a project.
- [ ] **Sketch:** draw the page on paper or in Excalidraw and add the image to `docs/tasks/week-1/images/`. Label every button and field.
- [ ] **Data:** which fields from `mock-data.json` will each card show? (Hint: the client name is not in the project. How will you get it?)
- [ ] **Edge cases:** list at least 5 things that could go wrong and what the page should do. Example: "No projects match the search → show 'No projects found' and a Clear filters button."

## Part 2 – Shared piece: StatusBadge (Day 2)
Others need this early, so build it first.

- [ ] Agree on how it is used in `team-agreement.md` (e.g. `<StatusBadge status="active" />`)
- [ ] Build `components/StatusBadge.jsx`, with one colour per status: planning, active, delivered, archived
- [ ] Use Righteous's `labels.js` for the text (e.g. "Delivered")
- [ ] Post in the PR when it's ready, mentioning Tega and Righteous

## Part 3 – Build the page (Day 2–4)
- [ ] Show all 6 projects from mock data (use Tega's `useMockProjects`)
- [ ] Each card shows: title, client name, type, status badge, dates
- [ ] A "Published" tag on projects where `is_published` is true
- [ ] Search box (search by title or client name)
- [ ] Filter by status (dropdown)
- [ ] Filter by client (dropdown)
- [ ] Clicking a card goes to `/projects/:id` (Tega's page)
- [ ] "+ New project" button goes to `/projects/new` (Righteous's page)
- [ ] Message when nothing matches the filters

## Part 4 – Team work
- [ ] Join the Day 1 kick-off call
- [ ] Post a mid-week update in Discussions (Day 3)
- [ ] Join the Day 4 click-through test
- [ ] Review **Tega's** PR (W1-02) with 3+ comments
- [ ] Reply to every review comment on your own PR

## Done when
- [ ] Every box above is ticked
- [ ] The page works at http://localhost:5173/projects
- [ ] A screenshot is added to the PR
- [ ] The PR is marked "Ready for review"

## Tips for using AI
Give the AI this file, `mock-data.json`, and `docs/05-data-model.md`. Then ask, for example:
> "I'm building a React page that lists projects from this JSON. Help me build a search box and two filter dropdowns. Explain each part simply."

Make sure you understand every line before you commit it.

---

## My answers

### User flow
1.

### Data each card shows
|  Shown on card | Comes from |
|----------------|-----------|
| | |

### Edge cases
| # | What could go wrong | What the page does |
|---|---------------------|--------------------|
| 1 | | |

### Notes / questions for the team
-
