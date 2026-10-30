import { NavLink, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <nav>
          <NavLink to="/" end>
            Tasks
          </NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
