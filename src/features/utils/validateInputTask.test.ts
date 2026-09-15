import { describe, expect, it } from "vitest";
import { validateInputTask } from "./validateInputTask";

describe("validateInputTask", () => {
  it("should return true for valid task input", () => {
    const result = validateInputTask("Test Task");
    expect(result).toEqual({ value: "Test Task", error: null });
  });

  it("should return error for empty task input", () => {
    const result = validateInputTask("");
    expect(result).toEqual({ value: "", error: "Title cannot be empty" });
  });

  it("should return error for task input with only whitespace", () => {
    const result = validateInputTask("   ");
    expect(result).toEqual({
      value: "",
      error: "Title cannot be empty",
    });
  });

  it("should return error for task input shorter than 3 characters", () => {
    const result = validateInputTask("Hi");
    expect(result).toEqual({
      value: "Hi",
      error: "Title must be at least 3 characters long",
    });
  });

  it("should return error for task input longer than 20 characters", () => {
    const result = validateInputTask("This is a very long task title");
    expect(result).toEqual({
      value: "This is a very long task title",
      error: "Title cannot exceed 20 characters",
    });
  });
});
