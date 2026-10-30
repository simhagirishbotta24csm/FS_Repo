import { CATEGORIES } from "../state/tasksReducer.js";

const STATUSES = ["all", "active", "completed"];

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        aria-label="Search tasks"
        placeholder="Search…"
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
      />
      <div className="segmented" role="group" aria-label="Status filter">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={filters.status === s ? "active" : ""}
            aria-pressed={filters.status === s}
            onClick={() => onChange({ ...filters, status: s })}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <select
        aria-label="Category filter"
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      >
        <option value="all">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
