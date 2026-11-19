W2-03 - All Tasks and People (Righteous)

Owner: Righteous
Branch: righteous/W2-03-task-lists
Your folder: frontend/src/modules/m2-task-board/pages/righteous/
Due: end of Day 5


What you are building

You are building two pages. The first is All tasks at /tasks, in the file AllTasksPage.jsx. The second is People at /tasks/people, in the file WorkloadPage.jsx.

All tasks shows every task from every project in one list, so you can see what is late and what is due soon. People shows how much work each person has.


Tools you can use

These are already built. Just import them into your page.

To get every task, use useTasks() from taskStore.js. Each task comes with its project and its person.
To find out how urgent a task is, use dueState(task) from taskRules.js. It tells you if the task is overdue, due today, due soon, due later or done. It gives null if there is no due date.
For the status names, use TASK_STATUSES.
To mark a task done, use moveTask(id, 'done').
To get projects, use useProjects(). To get people, use useTeam().
To show the status, use TaskStatusBadge. For the due date, use DueLabel. For a person's initials, use PersonAvatar.

Tip: the Projects list page (m1-projects/pages/ProjectListPage.jsx) already has a search box, filters and number cards you can learn from.


Step 1 - Plan it (Day 1)

Write your answers at the bottom of this file.

Write down, step by step, what a manager does on each page.
Sketch both pages and add a photo to docs/tasks/week-2/images/.
Decide what order the list goes in, and write it down. For example: overdue first, then by due date, with no date last.
List at least 6 things that could go wrong. For example: there are no tasks, a task has no person, or 200 tasks make the page slow.


Step 2 - All tasks page (Day 2 to 3)

Put four number cards at the top: Overdue, Due this week, In progress and Done. Clicking a card filters the list.
Add a search box that searches the task title and the project name.
Add filters for status, project, person (including "Unassigned") and due date (Overdue, Due today, This week, No date).
Add a "Clear filters" button, and text like "Showing 8 of 24 tasks".
Each task in the list shows its title, status, project, person and due date.
Give each task a tick box that marks it done.
Clicking a task opens /tasks/<id>. That is Tega's page, and the link works even before it is built.
Keep the filters in the address, like /tasks?status=todo, so the back button keeps them. The Projects list does this with useSearchParams.
Show a message when there are no tasks, and a different one when nothing matches the filters.


Step 3 - People page (Day 3 to 4)

Show a card for each team member, with their name, role, and how many tasks are open, overdue and done.
Add a bar on each card showing how much of their work is done.
Add an extra "Unassigned" card for tasks with no person.
Clicking a card goes to /tasks?person=<id>, which shows the All tasks page filtered to that person.
Put the person with the most overdue tasks first.
If there is no one on the team, show a message with a link to the Team page.


Step 4 - Finish (Day 5)

Make sure both pages look good on a phone.
Add screenshots of both pages to your pull request.
Reply to every comment on your pull request.
Click "Ready for review".

You are done when everything above works and you have only changed files inside pages/righteous/.


My answers

Steps on the All tasks page:


Steps on the People page:


The order of the list:


Things that could go wrong, and what the page does:


Notes or questions:

