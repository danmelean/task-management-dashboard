import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskTable } from "./TaskTable";
import type { Task } from "../../types/Task";

describe("TaskTable", () => {
  it("rendes the table headers", () => {
    const tasks: Task[] = [];
    render(<TaskTable tasks={tasks} />);

    screen.debug();

    expect(
      screen.getByRole("columnheader", { name: "ID" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Task" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Completed" }),
    ).toBeInTheDocument();
  });

  it("renders all tasks", () => {
    const tasks: Task[] = [
      { id: "1", title: "Buy milk", completed: true },
      { id: "2", title: "Walk dog", completed: false },
    ];

    render(<TaskTable tasks={tasks} />);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByText("Completed", {exact:true})).toHaveLength(2);
    expect(screen.getByText("Pending")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(3);
  });
});
