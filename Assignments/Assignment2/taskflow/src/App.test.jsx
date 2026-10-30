import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";
import { TasksProvider } from "./state/TasksContext.jsx";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <TasksProvider>
        <App />
      </TasksProvider>
    </MemoryRouter>
  );
}

describe("TaskFlow app", () => {
  it("shows an empty state", () => {
    renderApp();
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it("validates an empty title", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/enter a task title/i);
  });

  it("adds, completes and deletes a task", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByLabelText(/task title/i), "Buy milk");
    await user.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /buy milk/i }));
    expect(screen.getByRole("checkbox", { name: /buy milk/i })).toBeChecked();

    await user.click(screen.getByRole("button", { name: /delete "buy milk"/i }));
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("persists tasks to localStorage", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByLabelText(/task title/i), "Persist me");
    await user.click(screen.getByRole("button", { name: /add task/i }));
    expect(localStorage.getItem("taskflow.tasks.v1")).toContain("Persist me");
  });

  it("renders the stats page", () => {
    renderApp("/stats");
    expect(screen.getByText(/your progress/i)).toBeInTheDocument();
  });

  it("renders a not-found page for unknown routes", () => {
    renderApp("/nope");
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
