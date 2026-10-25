# Issue #3 — Due date support for tasks

## Requirements
- Optional `<input type="date">` in the add-task form, next to the Add button.
- Due date stored on the task as an ISO date string (`YYYY-MM-DD`), or `null` when not set.
- Task row shows the due date (e.g. "Due: Sep 20") when set.
- Tasks past their due date are highlighted using `--color-danger`.
- Tasks without a due date behave as before.

## Plan
1. `src/taskManager.js`
   - `createTask` / `addTask` take an optional `dueDate` argument and store it (`null` if empty).
   - Add `isOverdue(task, today)`: true when the task has a due date earlier than today and is not completed. `today` defaults to the current local date and can be injected for tests.
2. `index.html`: add `<input type="date" id="dueDateInput">` in the form.
3. `src/ui.js`
   - Pass the date to `addTask` and clear it after submit.
   - Render a `Due: <Mon D>` label; add an `overdue` class to the row when `isOverdue`.
4. `src/styles.css`: `.task-due` styles, and `.task-item.overdue` using `var(--color-danger)`.
5. `tests/taskManager.test.js`: cover storing the due date, default `null`, and `isOverdue` (past, today, future, none, completed).

## Decisions
- Completed tasks are not shown as overdue.
- A task due today is not overdue.
- Dates are compared as `YYYY-MM-DD` strings in local time, and formatted without `Date` timezone parsing to avoid off-by-one-day errors.
