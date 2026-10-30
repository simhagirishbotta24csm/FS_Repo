import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const today = new Date().toISOString().slice(0, 10);
  const overdue = !task.completed && task.dueDate && task.dueDate < today;

  function save() {
    const next = draft.trim();
    if (next && next !== task.title) onRename(next);
    else setDraft(task.title);
    setEditing(false);
  }

  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "done"}`}
        checked={task.completed}
        onChange={onToggle}
      />
      <div className="task-body">
        {editing ? (
          <input
            autoFocus
            aria-label="Edit title"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setDraft(task.title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span className="title" onDoubleClick={() => setEditing(true)}>
            {task.title}
          </span>
        )}
        <div className="meta">
          <span className="badge">{task.category}</span>
          {task.dueDate && (
            <span className={overdue ? "due overdue" : "due"}>
              Due {task.dueDate}
              {overdue ? " (overdue)" : ""}
            </span>
          )}
        </div>
      </div>
      <button
        className="icon"
        aria-label={`Edit "${task.title}"`}
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
      <button
        className="icon danger"
        aria-label={`Delete "${task.title}"`}
        onClick={onDelete}
      >
        Delete
      </button>
    </li>
  );
}
