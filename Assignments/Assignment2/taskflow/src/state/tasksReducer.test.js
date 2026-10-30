import { describe, expect, it } from "vitest";
import {
  computeStats,
  createTask,
  filterTasks,
  tasksReducer,
} from "./tasksReducer.js";

const make = (over = {}) => ({ ...createTask({ title: "Task" }), ...over });

describe("tasksReducer", () => {
  it("adds a task to the front", () => {
    const a = make({ title: "A" });
    const b = make({ title: "B" });
    expect(tasksReducer([a], { type: "add", task: b })[0].title).toBe("B");
  });

  it("toggles completion", () => {
    const t = make();
    const next = tasksReducer([t], { type: "toggle", id: t.id });
    expect(next[0].completed).toBe(true);
  });

  it("updates and deletes", () => {
    const t = make();
    const updated = tasksReducer([t], {
      type: "update",
      id: t.id,
      changes: { title: "New" },
    });
    expect(updated[0].title).toBe("New");
    expect(tasksReducer(updated, { type: "delete", id: t.id })).toEqual([]);
  });

  it("clears completed tasks only", () => {
    const done = make({ completed: true });
    const open = make();
    expect(tasksReducer([done, open], { type: "clearCompleted" })).toEqual([open]);
  });
});

describe("filterTasks", () => {
  const tasks = [
    make({ title: "Write report", category: "Work" }),
    make({ title: "Go for a run", category: "Health", completed: true }),
  ];

  it("filters by status, category and query", () => {
    expect(filterTasks(tasks, { status: "completed" })).toHaveLength(1);
    expect(filterTasks(tasks, { category: "Work" })).toHaveLength(1);
    expect(filterTasks(tasks, { query: "RUN" })).toHaveLength(1);
    expect(filterTasks(tasks, {})).toHaveLength(2);
  });
});

describe("computeStats", () => {
  it("counts totals, overdue and percent", () => {
    const tasks = [
      make({ completed: true }),
      make({ dueDate: "2020-01-01" }),
      make({ dueDate: "2999-01-01" }),
    ];
    const s = computeStats(tasks, "2026-10-09");
    expect(s).toMatchObject({ total: 3, completed: 1, active: 2, overdue: 1, percentDone: 33 });
  });

  it("handles an empty list", () => {
    expect(computeStats([]).percentDone).toBe(0);
  });
});
