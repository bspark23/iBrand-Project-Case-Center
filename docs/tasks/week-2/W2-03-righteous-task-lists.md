# W2-03 – All Tasks and People (Righteous)

**Owner:** Righteous
**Reviewed by:** Tega
**Branch:** `righteous/W2-03-task-lists`
**Your folder:** `frontend/src/modules/m2-task-board/pages/righteous/`
**Due:** end of Day 5

## What you are building

Two pages:

| Page | Address | File |
|------|---------|------|
| All tasks | `/tasks` | `AllTasksPage.jsx` |
| People | `/tasks/people` | `WorkloadPage.jsx` |

**All tasks** shows every task from every project in one list, so you can see what's late and what's due soon.
**People** shows how much work each person has.

## Tools you can use

All of these are ready. Import them into your page.

| What | Where | How |
|------|-------|-----|
| Every task | `taskStore.js` | `const tasks = useTasks()`. Each one has `.project` and `.assignee`. |
| How urgent a task is | `taskRules.js` | `dueState(task)` gives `{ key: 'overdue', text: 'Overdue by 2 days' }`. The key can be `overdue`, `today`, `soon`, `later` or `done`, or the result is `null` if there's no date. |
| Status names | `taskRules.js` | `TASK_STATUSES` |
| Mark a task done | `taskStore.js` | `moveTask(id, 'done')` |
| Projects | `m1-projects/store.js` | `useProjects()` |
| People | `shared/teamStore.js` | `useTeam()` |
| Status tag | `components/TaskStatusBadge.jsx` | `<TaskStatusBadge status={task.status} />` |
| Due date tag | `components/DueLabel.jsx` | `<DueLabel task={task} />` |
| Person's initials | `shared/ui/PersonAvatar.jsx` | `<PersonAvatar person={task.assignee} />` |

Tip: look at the Projects list page (`m1-projects/pages/ProjectListPage.jsx`). It already has a search box, filters and number cards you can learn from.

## Step 1 – Plan it (Day 1)

Write your answers at the bottom of this file.

- [ ] **Steps:** write what a manager does on each page, step by step.
- [ ] **Drawing:** sketch both pages and add a photo to `docs/tasks/week-2/images/`.
- [ ] **Sorting rule:** decide the order of the list. For example, overdue first, then by due date, with no date last. Write it down.
- [ ] **Problems:** list at least 6 things that could go wrong. For example, "there are no tasks", "a task has no person", or "200 tasks make the page slow".

## Step 2 – All tasks page (Day 2–3)

- [ ] 4 number cards at the top: **Overdue**, **Due this week**, **In progress**, **Done**. Clicking a card filters the list.
- [ ] A search box that searches the task title and the project name.
- [ ] Filters: status, project, person (including "Unassigned"), and due ("Overdue", "Due today", "This week", "No date").
- [ ] A "Clear filters" button, and the text "Showing 8 of 24 tasks".
- [ ] The list shows each task's title, status, project, person and due date.
- [ ] A tick box on each row marks the task done (`moveTask(id, 'done')`).
- [ ] Click a task to open `/tasks/<id>`. (That's Tega's page, and the link works even before it's built.)
- [ ] Keep the filters in the address, like `/tasks?status=todo`, so the back button keeps them. The Projects list does this with `useSearchParams`.
- [ ] Show a message when there are no tasks, and another when nothing matches the filters.

## Step 3 – People page (Day 3–4)

- [ ] A card for each team member, showing their name, role, and how many tasks are open, overdue and done.
- [ ] A bar on each card showing how much of their work is done.
- [ ] An extra "Unassigned" card for tasks with no person.
- [ ] Click a card to go to `/tasks?person=<id>`, the All tasks page filtered to that person.
- [ ] Sort the cards with the person who has the most overdue tasks first.
- [ ] If there's no one on the team, show a message with a link to the Team page.

## Step 4 – Finish (Day 5)

- [ ] It looks good on a phone.
- [ ] Add screenshots of both pages to your PR.
- [ ] Review **Samuel's** PR and leave 3 or more comments.
- [ ] Reply to every comment on your own PR.
- [ ] Click **Ready for review**.

## Done when

- [ ] Every box above is ticked.
- [ ] You only changed files inside `pages/righteous/`.

---

## My answers

### Steps – All tasks
1.

### Steps – People
1.

### Sorting rule
-

### Problems
| # | What could go wrong | What the page does |
|---|---------------------|--------------------|
| 1 | | |

### Notes or questions
-
