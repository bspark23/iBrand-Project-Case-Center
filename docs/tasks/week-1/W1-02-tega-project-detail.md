# W1-02 – Project Detail page

**Owner:** Tega
**Reviewed by (teammate):** Samuel
**Your branch (you create it):** `tega/W1-02-project-detail`
**Page:** `/projects/:id`
**Main file:** `frontend/src/modules/m1-projects/pages/ProjectDetailPage.jsx`
**You also own:** `frontend/src/modules/m1-projects/useMockProjects.js` (used by everyone)
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
   git checkout -b tega/W1-02-project-detail
   ```
3. Each time you want to save and share your work:
   ```
   git add .
   git commit -m "W1-02: what you did"
   git push -u origin tega/W1-02-project-detail
   ```
4. The first time you push, open a **draft pull request** on GitHub from your branch.
   - Title: `[W1-02]  - Tega`
   - Write `Task: docs/tasks/week-1/W1-02-tega-project-detail.md` in the description
5. Keep pushing to the same branch. The PR updates by itself.
6. When every box in this file is ticked, click **"Ready for review"**.

> Not sure which branch you're on? Run `git branch`. The one with `*` is yours. If it says `main`, switch with `git checkout tega/W1-02-project-detail`.

## What this page does
This page shows one project in full. It is the "home" of a project: later, the Task Board, Equipment and Media modules will open as tabs here. It also has the **Publish as Case** button, which turns a finished project into a case study.

## Part 1 – Think first (Day 1–2)
Write your answers in the sections at the bottom of this file.

- [ ] **User flow:** write the steps a staff member takes from opening a project to publishing it.
- [ ] **Sketch:** draw the page and add the image to `docs/tasks/week-1/images/`. Show where the tabs for Tasks, Equipment and Media will go.
- [ ] **Publish rules:** read rules 1 and 2 at the bottom of `docs/05-data-model.md`. Write in your own words when the Publish button should be shown, hidden, or greyed out.
- [ ] **Edge cases:** list at least 5. Example: "The id in the URL doesn't exist → show 'Project not found' and a link back to the list."

## Part 2 – Shared piece: useMockProjects (Day 2)
Others need this early, so build it first.

- [ ] Agree on what it returns in `team-agreement.md`
- [ ] Build `useMockProjects.js`. It reads `mock-data.json` and returns projects with their client attached, e.g. `project.client.name`
- [ ] Also return a single project by id (e.g. `useMockProject(id)`)
- [ ] Post in the PR when it's ready, mentioning Samuel and Righteous

## Part 3 – Build the page (Day 2–4)
- [ ] Find the project using the `id` from the URL
- [ ] Show: title, client name, type, status (use Samuel's `StatusBadge`), start and end dates, created and updated dates
- [ ] Show the client's brand colour somewhere (e.g. a coloured bar at the top)
- [ ] Tabs: Overview, Tasks, Equipment, Media. Only Overview has content for now; the others say "Coming soon"
- [ ] "Edit" button goes to `/projects/:id/edit` (Righteous's page)
- [ ] "Publish as Case" button that follows your publish rules
- [ ] When published: show "Published on <date>" instead of the button
- [ ] "Project not found" message for a wrong id
- [ ] "← All projects" link back to the list

> Publishing only changes things on screen for now. It will save for real once the backend is ready.

## Part 4 – Team work
- [ ] Join the Day 1 kick-off call
- [ ] Post a mid-week update in Discussions (Day 3)
- [ ] Join the Day 4 click-through test
- [ ] Review **Righteous's** PR (W1-03) with 3+ comments
- [ ] Reply to every review comment on your own PR

## Done when
- [ ] Every box above is ticked
- [ ] All 6 mock projects open correctly at http://localhost:5173/projects/<id>
- [ ] Screenshots added to the PR: one delivered project, one active project, and the "not found" message
- [ ] The PR is marked "Ready for review"

## Tips for using AI
Give the AI this file, `mock-data.json`, and the "Rules that must always be true" section of `docs/05-data-model.md`. Ask, for example:
> "Help me write a React hook that joins projects with their clients from this JSON. Explain it simply."

Make sure you understand every line before you commit it.

---

## My answers

### User flow
1.

### Publish rules (in my own words)
| Project status | Already published? | What the button does |
|----------------|--------------------|----------------------|
| planning | no | |
| active | no | |
| delivered | no | |
| delivered | yes | |
| archived | no | |

### Edge cases
| # | What could go wrong | What the page does |
|---|---------------------|--------------------|
| 1 | | |

### Notes / questions for the team
-
