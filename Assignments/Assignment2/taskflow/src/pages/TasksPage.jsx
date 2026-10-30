import { useMemo, useState } from "react";
import { useTasks } from "../state/TasksContext.jsx";
import { createTask, filterTasks } from "../state/tasksReducer.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskItem from "../components/TaskItem.jsx";
import FilterBar from "../components/FilterBar.jsx";

export default function TasksPage() {
  const { tasks, dispatch } = useTasks();
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    query: "",
  });
  const visible = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <section>
      <TaskForm onAdd={(data) => dispatch({ type: "add", task: createTask(data) })} />
      <FilterBar filters={filters} onChange={setFilters} />

      {visible.length === 0 ? (
        <p className="empty">
          {tasks.length === 0
            ? "No tasks yet. Add your first one above."
            : "No tasks match your filters."}
        </p>
      ) : (
        <ul className="task-list">
          {visible.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => dispatch({ type: "toggle", id: t.id })}
              onDelete={() => dispatch({ type: "delete", id: t.id })}
              onRename={(title) =>
                dispatch({ type: "update", id: t.id, changes: { title } })
              }
            />
          ))}
        </ul>
      )}

      {hasCompleted && (
        <button
          className="link"
          onClick={() => dispatch({ type: "clearCompleted" })}
        >
          Clear completed
        </button>
      )}
    </section>
  );
}
