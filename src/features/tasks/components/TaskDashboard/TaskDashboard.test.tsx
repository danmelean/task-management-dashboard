import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskDashboard } from "./TaskDashboard";
import { createTask } from "../../services/taskService";

vi.mock("../TaskInput", () => ({
  TaskInput: ({
    onAddTask,
  }: {
    onAddTask: (title: string) => Promise<void>;
  }) => (
    <button type="button" onClick={() => onAddTask("Buy milk")}>
      Mock Add Task
    </button>
  ),
}));

vi.mock("../TaskImport/TaskImport", () => ({
  TaskImport: ({
    onAddTask,
  }: {
    onAddTask: (title: string) => Promise<void>;
  }) => (
    <button type="button" onClick={() => onAddTask("Imported task")}>
      Mock import Task
    </button>
  ),
}));

vi.mock("../TaskTable", () => ({
  TaskTable: ({
    tasks,
  }: {
    tasks: Array<{ id: string; title: string; completed: boolean }>;
  }) => (
    <div data-testid="task-table">
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  ),
}));

vi.mock("../../service/taskService", () => ({
  createTask: vi.fn(),
}));

const mockedCreateTask = vi.mocked(createTask);

describe("TaskDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows and empty state when tere are no tasks", () => {
    render(<TaskDashboard />);

    expect(screen.getByText("No tasks yet.")).toBeInTheDocument();
    expect(screen.queryByTestId("task-table")).not.toBeInTheDocument();
  });
});
