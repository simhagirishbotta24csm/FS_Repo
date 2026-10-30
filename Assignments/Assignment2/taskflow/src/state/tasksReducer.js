export const CATEGORIES = ["Work", "Personal", "Study", "Health"];

export function createTask({ title, category = "Personal", dueDate = "" }) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    category,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  };
}

export function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return [action.task, ...state];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case "update":
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action.changes } : t
      );
    case "delete":
      return state.filter((t) => t.id !== action.id);
    case "clearCompleted":
      return state.filter((t) => !t.completed);
    default:
      return state;
  }
}

export function filterTasks(tasks, { status = "all", category = "all", query = "" }) {
  const q = query.trim().toLowerCase();
  return tasks.filter((t) => {
    if (status === "active" && t.completed) return false;
    if (status === "completed" && !t.completed) return false;
    if (category !== "all" && t.category !== category) return false;
    if (q && !t.title.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function computeStats(tasks, today = new Date().toISOString().slice(0, 10)) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && t.dueDate < today
  ).length;
  const byCategory = CATEGORIES.map((c) => ({
    category: c,
    count: tasks.filter((t) => t.category === c).length,
  }));
  return {
    total,
    completed,
    active: total - completed,
    overdue,
    percentDone: total ? Math.round((completed / total) * 100) : 0,
    byCategory,
  };
}
