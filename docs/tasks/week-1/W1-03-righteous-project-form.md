# W1-03 – Create / Edit Project form

**Owner:** Righteous
**Reviewed by (teammate):** Tega
**Your branch (you create it):** `righteous/W1-03-project-form`
**Pages:** `/projects/new` and `/projects/:id/edit`
**Main file:** `frontend/src/modules/m1-projects/pages/ProjectFormPage.jsx`
**You also own:** `frontend/src/modules/m1-projects/labels.js` (used by everyone)
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
   git checkout -b righteous/W1-03-project-form
   ```
3. Each time you want to save and share your work:
   ```
   git add .
   git commit -m "W1-03: what you did"
   git push -u origin righteous/W1-03-project-form
   ```
4. The first time you push, open a **draft pull request** on GitHub from your branch.
   - Title: `[W1-03]  - Righteous`
   - Write `Task: docs/tasks/week-1/W1-03-righteous-project-form.md` in the description
5. Keep pushing to the same branch. The PR updates by itself.
6. When every box in this file is ticked, click **"Ready for review"**.

> Not sure which branch you're on? Run `git branch`. The one with `*` is yours. If it says `main`, switch with `git checkout righteous/W1-03-project-form`.

## What this page does
One form, used two ways:
- **New:** create a project with empty fields.
- **Edit:** change an existing project, with the fields already filled in.

## Part 1 – Think first (Day 1–2)
Write your answers in the sections at the bottom of this file.

- [ ] **User flow:** write the steps for creating a project, and the steps for editing one.
- [ ] **Sketch:** draw the form and add the image to `docs/tasks/week-1/images/`. Show where error messages appear.
- [ ] **Fields:** look at the `projects` table in `docs/05-data-model.md`. Which fields does the user fill in, and which does the system set by itself (like `id` and `created_at`)? Fill in the table below.
- [ ] **Validation rules:** what makes the form invalid? Example: "End date is before start date → show 'End date must be after start date'."
- [ ] **Edge cases:** list at least 5. Example: "The user clicks Cancel after typing → ask 'Discard changes?'"

## Part 2 – Shared piece: labels.js (Day 2)
Others need this early, so build it first.

- [ ] Agree on how it's used in `team-agreement.md`
- [ ] Build `labels.js` with readable names for:
  - project type: `event`, `livestream`, `brand_film`, `documentary`
  - project status: `planning`, `active`, `delivered`, `archived`
- [ ] Also export the lists of options, for dropdowns
- [ ] Post in the PR when it's ready, mentioning Samuel and Tega

## Part 3 – Build the form (Day 2–4)
- [ ] Fields: title, client (dropdown from mock clients), type (dropdown), status (dropdown), start date, end date
- [ ] On `/projects/:id/edit`, fill the fields with that project's data (use Tega's `useMockProject`)
- [ ] Page title says "New project" or "Edit project"
- [ ] Show an error under each wrong field, using your validation rules
- [ ] The Save button is disabled while the form is invalid
- [ ] Save on a new project → go to the list (or wherever you agreed in `team-agreement.md`)
- [ ] Save on an edit → go back to that project's detail page
- [ ] Cancel → go back without saving
- [ ] "Project not found" message if the edit id doesn't exist

> Saving only works on screen for now (e.g. log the data and show "Saved"). It will save for real once the backend is ready.

## Part 4 – Team work
- [ ] Join the Day 1 kick-off call, and **type up `team-agreement.md`** during it (you're the note-taker)
- [ ] Post a mid-week update in Discussions (Day 3)
- [ ] Join the Day 4 click-through test
- [ ] Review **Samuel's** PR (W1-01) with 3+ comments
- [ ] Reply to every review comment on your own PR

## Done when
- [ ] Every box above is ticked
- [ ] The form works at http://localhost:5173/projects/new and on `/projects/<id>/edit`
- [ ] Screenshots added to the PR: an empty form, the form showing errors, and an edit form
- [ ] The PR is marked "Ready for review"

## Tips for using AI
Give the AI this file, the `projects` table from `docs/05-data-model.md`, and `mock-data.json`. Ask, for example:
> "Help me build a React form with these fields and these validation rules. Explain how the error messages work."

Make sure you understand every line before you commit it.

---

## My answers

### User flow – create
1.

### User flow – edit
1.

### Fields
| Field | User fills it in, or system sets it? | Required? |
|-------|--------------------------------------|-----------|
| id | | |
| client_id | | |
| title | | |
| type | | |
| status | | |
| start_date | | |
| end_date | | |
| is_published | | |
| published_at | | |
| created_by | | |
| created_at | | |
| updated_at | | |

### Validation rules
| Field | Rule | Error message |
|-------|------|---------------|
| | | |

### Edge cases
| # | What could go wrong | What the form does |
|---|---------------------|--------------------|
| 1 | | |

### Notes / questions for the team
-
