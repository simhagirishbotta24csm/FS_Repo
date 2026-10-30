import { useTasks } from "../state/TasksContext.jsx";
import { computeStats } from "../state/tasksReducer.js";

export default function StatsPage() {
  const { tasks } = useTasks();
  const s = computeStats(tasks);

  return (
    <section>
      <h2>Your progress</h2>
      <div className="stat-grid">
        <Stat label="Total" value={s.total} />
        <Stat label="Active" value={s.active} />
        <Stat label="Completed" value={s.completed} />
        <Stat label="Overdue" value={s.overdue} />
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={s.percentDone}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Completion"
      >
        <div style={{ width: `${s.percentDone}%` }} />
      </div>
      <p>{s.percentDone}% complete</p>

      <h3>By category</h3>
      <ul className="cat-list">
        {s.byCategory.map((c) => (
          <li key={c.category}>
            <span>{c.category}</span>
            <strong>{c.count}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
