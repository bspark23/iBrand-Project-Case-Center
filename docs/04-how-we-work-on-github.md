# 4. How We Work on GitHub

## The basic idea

- `main` is the real, working version of the project. Nobody changes it directly.
- To do a task, you make a **branch** (your own copy), do the work there, then open a **pull request (PR)**.
- The lead reviews the PR. If it's good, the lead merges it into `main`.

## Step by step: doing a task

1. **Get your task.** Open the GitHub Project board. Your task is an issue assigned to you. Move it to **In progress**.
2. **Get the latest code.**
   ```
   git checkout main
   git pull
   ```
3. **Make a branch.** Name it `<task-id>-short-name`:
   ```
   git checkout -b P1-02-taskboard-user-flow
   ```
4. **Do the work.** Use AI to help (see below).
5. **Save your work (commit).**
   ```
   git add .
   git commit -m "P1-02: add user flow for task board"
   ```
6. **Send it to GitHub (push).**
   ```
   git push -u origin P1-02-taskboard-user-flow
   ```
7. **Open a pull request** on GitHub. Fill in the template. Write `Closes #<issue number>` so the issue closes when merged.
8. **Move the issue to In review.**
9. **Fix review comments**, commit and push again. The PR updates by itself.
10. The lead merges. The task moves to **Done**.

If you get stuck on Git, ask an AI: *"I ran `<command>` and got this error: `<error>`. What do I do?"*

## Rules

- One task = one branch = one PR.
- Keep PRs small. If a PR changes more than ~300 lines, split it.
- Only change files inside **your** module unless the issue says otherwise.
- Never change the data model or API contract on your own. Open an issue with the label `contract-change` and the lead decides.
- Never put passwords, secrets or `.env` files in Git.
- Branches should live for a few days at most. Merge often.

## Using AI to help

AI is your helper, not your replacement. You must understand what you submit.

**Good ways to use AI**

- "Explain this code to me like I'm new to programming."
- "Here is my data model and screen sketch. Help me build this React component."
- "What edge cases might I be missing for a file upload feature?"
- "Review my code and tell me what could break."

**Always give the AI context.** Paste in:
- The task from the issue
- The relevant part of `05-data-model.md` and `06-api-contract.md`
- Your module's design doc

**Before opening a PR, check:**
- Can you explain every file you changed in your own words?
- Does it run?
- Does it only use endpoints from the API contract?

In your PR, say which parts the AI helped with. That is fine and expected.

## Deadlines

- Each issue has a due week. The lead sets the exact date.
- If you think you'll miss a deadline, **say so at least 2 days before** in a comment on the issue. Being late is fixable. Being late and silent is not.
- Blocked by someone else? Add the label `blocked` and mention the person (`@username`).

## Weekly check-in

Once a week, one engineer runs a 15-minute check-in (we take turns). They post notes in **GitHub Discussions** using this format:

```
## Check-in – Week X

### Each person
- **Name**: Done this week / Doing next / Blocked by

### Deadlines at risk
-

### Decisions made
-
```

## Reviewing a teammate's PR

You don't need to be an expert to review. Check:

- Does the PR do what the issue asked?
- Is anything confusing? Ask.
- Did they update the README or docs if needed?
- Leave at least one helpful comment, even if it's a question.
