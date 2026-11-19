Week 2 - Task Board

Team: Samuel, Tega, Righteous
Lead: bspark23
Deadline: end of Day 5 (date: ____________)


What we are building

The Task Board is where the team keeps track of work on each project. A task is one job, like "Book camera crew". Each task has a title, a project, a person, a status (To do, In progress or Done) and a due date.


Who does what

Samuel builds the board, where you drag cards between columns, and the board picker. His task file is W2-01-samuel-task-board.md.
Tega builds the task form, for creating and editing, and the task page. His task file is W2-02-tega-task-form-and-detail.md.
Righteous builds the list of all tasks and the People page. His task file is W2-03-righteous-task-lists.md.


You don't need to wait for anyone

The lead has already built everything you share: the data, the rules, the small shared pieces and the pages' addresses. Every page already has an empty starter file with your name on it.

To get test tasks, run the app with npm run dev. A "Test data" button sits at the bottom right of the Task Board pages. Click it to add 12 test tasks to your own browser. Nobody else sees them.

Your pages link to each other with normal links. A link works even before the other page is built. It just shows a "being built" box.

Only change files in your own folder: pages/samuel, pages/tega or pages/righteous. Don't change the shared files. If you think one needs a change, ask the lead.


Before you start (once)

Get the latest code:
git checkout main
git pull

Start the app:
cd frontend
npm install
npm run dev

Open http://localhost:5173. Add a client, create 2 projects, and add 3 people on the Team page. Then open the Task Board, click "Test data" and add the test tasks.


Saving your work

Never push to main. Make your own branch first, using the branch name at the top of your task file:
git checkout -b samuel/W2-01-task-board

Each time you want to save and share your work:
git add .
git commit -m "W2-01: what you did"
git push -u origin samuel/W2-01-task-board

The first time you push, open a draft pull request on GitHub. Keep pushing to the same branch. When you're finished, click "Ready for review".


Working as a team

On Day 3, post a short update in GitHub Discussions. Say what you finished, what's next, and what's stuck.
If you're stuck for more than an hour, ask the team. If you're stuck for half a day, tell the lead.
If you might miss the deadline, say so at least 2 days before.


Using AI

Give the AI your task file, the "How to use" note at the top of taskStore.js, and your page file. Ask it to help you build one part at a time. Make sure you understand what it writes before you save it. In your pull request, say which parts the AI helped with.
