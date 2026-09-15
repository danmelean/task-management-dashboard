import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { TaskImport } from "./TaskImport";

import { parseTaskCsv } from "@/features/utils/parseTaskCsv";
import { beforeEach } from "node:test";

vi.mock("@/features/utils/parseTaskCsv", () => ({ parseTaskCsv: vi.fn() }));
const mockedParseTaskCsv = vi.mocked(parseTaskCsv);

describe("TaskImport", () => {
  beforeEach(() => {
    vi.clearAllMocks;
  });

  it("renders the CSV upload area", () => {
    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskImport onAddTask={onAddTask} />);

    expect(screen.getByText(/drag.*drop/i)).toBeInTheDocument();
  });

  it("import valid tasks from a CSV file", async () => {
    const user = userEvent.setup();

    const onAddTask = vi.fn().mockResolvedValue(undefined);

    mockedParseTaskCsv.mockReturnValue([
      { title: "Buy milk", error: null },
      { title: "Walk dog", error: null },
    ]);

    render(<TaskImport onAddTask={onAddTask} />);

    const file = new File(["title \nBuy milk\nWalk dog"], "tasks.csv", {
      type: "text/csv",
    });

    const input = screen.getByLabelText("Upload CSV file");

    await user.upload(input, file);

    expect(mockedParseTaskCsv).toHaveBeenCalledWith(
      "title \nBuy milk\nWalk dog",
    );

    expect(screen.getByText("tasks.csv")).toBeInTheDocument();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
    expect(screen.getByText("2 valid")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add 2 Tasks" }),
    ).toBeInTheDocument();

    const importButton = screen.getByRole("button", { name: "Add 2 Tasks" });

    await user.click(importButton);

    await waitFor(() => {
      expect(onAddTask).toHaveBeenCalledTimes(2);
    });

    expect(onAddTask).toHaveBeenNthCalledWith(1, "Buy milk");
    expect(onAddTask).toHaveBeenNthCalledWith(2, "Walk dog");
  });

  it("prevents importing when the CSV contains an invalid task", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn().mockResolvedValue(undefined);

    mockedParseTaskCsv.mockReturnValue([
      { title: "Buy milk", error: null },
      { title: "Hi", error: "Title must be at least 3 characters long" },
    ]);

    render(<TaskImport onAddTask={onAddTask} />);

    const file = new File(["title \nBuy milk\nHi"], "tasks.csv", {
      type: "text/csv",
    });

    const input = screen.getByLabelText("Upload CSV file");

    await user.upload(input, file);

    expect(mockedParseTaskCsv).toHaveBeenCalledWith("title \nBuy milk\nHi");

    expect(screen.getByText("tasks.csv")).toBeInTheDocument();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Hi")).toBeInTheDocument();
    expect(screen.getByText("1 valid")).toBeInTheDocument();
    expect(screen.getByText("1 invalid")).toBeInTheDocument();
    expect(screen.getByText("1 task need attention")).toBeInTheDocument();
    expect(onAddTask).not.toHaveBeenCalled();
  });
});
