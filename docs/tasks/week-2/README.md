# Week 2 – Task Board

**Team:** Samuel, Tega, Righteous
**Lead / reviewer:** @bspark23
**Deadline:** end of Day 5: ____________ (lead fills in the date)

## What we are building

The Task Board is where the team keeps track of work on each project.
A task is one job, like "Book camera crew". Each task has a title, a project, a person, a status (To do, In progress, Done) and a due date.

## Who does what

The Task Board has 6 pages. Each person builds 2.

| Person | Pages | Task file |
|--------|-------|-----------|
| **Samuel** | The board (drag cards between columns) and the board picker | [W2-01](W2-01-samuel-task-board.md) |
| **Tega** | The task form (create and edit) and the task page | [W2-02](W2-02-tega-task-form-and-detail.md) |
| **Righteous** | The list of all tasks, and the People page | [W2-03](W2-03-righteous-task-lists.md) |

## You don't need to wait for anyone

The lead has already built everything you share:
- **The data.** `taskStore.js` saves, reads, moves and deletes tasks. Just call its functions.
- **The rules.** `taskRules.js` has the status names, the checks for wrong input, and the due-date colours.
- **Small shared pieces.** These are `TaskStatusBadge`, `DueLabel`, and `PersonAvatar` (a person's initials in a circle).
- **The routes.** Every page already has its own address and an empty starter file with your name on it.
- **Test data.** When you run the app with `npm run dev`, a **Test data** button sits at the bottom right of every Task Board page. Click it to add 12 test tasks to **your own browser**. Nobody else sees them.

So you can start on Day 1 and finish without anyone else's work.

Your pages link to each other with normal links, like a card on Samuel's board linking to `/tasks/<id>` (Tega's page). A link works even before the other page is built. It just shows the "being built" box.

## Your files

Only change files in your own folder. Each folder is yours alone, so you'll never get a merge conflict.

```
frontend/src/modules/m2-task-board/
├── taskStore.js           shared – lead only, don't change
├── taskRules.js           shared – lead only, don't change
├── components/            shared – lead only, don't change
├── index.jsx              routes – lead only, don't change
└── pages/
    ├── samuel/            ← Samuel only
    ├── tega/              ← Tega only
    └── righteous/         ← Righteous only
```

If you need a new component, put it in **your own folder**. If you think a shared file needs a change, ask the lead in your PR instead of changing it.

## Before you start (once)

1. Get the latest code:
   ```
   git checkout main
   git pull
   ```
2. Start the app:
   ```
   cd frontend
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 and set up your test data:
   - Go to **Clients** and add a client.
   - Go to **Projects** and create 2 projects.
   - Go to **Team** and add 3 people.
   - Go to **Task Board**, click **Test data** (bottom right), and click **Add 12 test tasks**.

## Branches and pull requests

Never push to `main`. Make your own branch:

| Person | Branch |
|--------|--------|
| Samuel | `samuel/W2-01-task-board` |
| Tega | `tega/W2-02-task-form-and-detail` |
| Righteous | `righteous/W2-03-task-lists` |

```
git checkout -b samuel/W2-01-task-board      (use your own branch name)
git add .
git commit -m "W2-01: what you did"
git push -u origin samuel/W2-01-task-board
```

On your first push, open a **draft pull request** on GitHub. Keep pushing to the same branch. When every box in your task file is ticked, click **Ready for review**.

## Working as a team

You build alone, but you still help each other:
- **Day 3:** post a short update in GitHub Discussions, saying what you finished, what's next, and what's stuck.
- **Day 5:** review one teammate's PR and leave at least 3 helpful comments. Questions count.

```
Samuel reviews Tega · Tega reviews Righteous · Righteous reviews Samuel
```

- If you're stuck for more than an hour, ask the team. If you're stuck for half a day, tell the lead.
- If you might miss the deadline, say so in your PR at least 2 days before.

## Using AI

Give the AI:
1. your task file,
2. the "How to use" comment at the top of `taskStore.js`,
3. your page file.

Then ask it to help you build one part at a time. Make sure you understand every line before you commit it. Write in your PR which parts the AI helped with.
