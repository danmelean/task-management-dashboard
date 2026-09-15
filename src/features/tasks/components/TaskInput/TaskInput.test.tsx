import { describe, it, expect, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TaskInput } from "./TaskInput";
import { DuplicateTaskError } from "../../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../../errors/UnexpectedApiError";

describe("TaskInput", () => {
  it("adds a task and shows a success message", async () => {
    const user = userEvent.setup();

    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("What do you need to do?");

    const button = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "New Task");
    await user.click(button);

    expect(onAddTask).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue("");
    expect(
      screen.getByText('Task "New Task" added successfully!'),
    ).toBeInTheDocument();
  });

  it("shows a validation error for a title that is too short", async () => {
    const user = userEvent.setup();

    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("What do you need to do?");
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "Hi");
    await user.click(button);
    expect(
      screen.getByText("Title must be at least 3 characters long"),
    ).toBeInTheDocument();
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it("shows an API error message when a duplicate task is added", async () => {
    const user = userEvent.setup();

    const onAddTask = vi.fn().mockRejectedValue(new DuplicateTaskError());

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("What do you need to do?");

    await user.type(input, "Buy milk");

    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(screen.getByText("Task already exists")).toBeInTheDocument();

    expect(input).toHaveValue("Buy milk");
  });

  it("shows an unexpected API error message when an unexpected error occurs", async () => {
    const user = userEvent.setup();

    const onAddTask = vi.fn().mockRejectedValue(new UnexpectedApiError());

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("What do you need to do?");

    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add Task" }));
    expect(
      screen.getByText("An unexpected error occurred"),
    ).toBeInTheDocument();
    expect(input).toHaveValue("Buy milk");
  });

  it("disables the form while the task is being added", async () => {
    const user = userEvent.setup();

    let resolveRequest!: () => void;

    const request = new Promise<void>((resolve) => {
      resolveRequest = resolve;
    });

    const onAddTask = vi.fn().mockReturnValue(request);

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("What do you need to do?");

    await user.type(input, "Buy milk");

    const button = screen.getByRole("button", { name: "Add Task" });

    await user.click(button);

    const loadingButton = screen.getByRole("button", { name: "Adding..." });

    expect(loadingButton).toBeDisabled();

    expect(input).toBeDisabled();

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Add Task" })).toBeEnabled();
    });
  });

});
