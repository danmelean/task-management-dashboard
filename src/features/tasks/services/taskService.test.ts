import { describe, expect, it, vi, beforeEach } from "vitest";

import { createTask } from "./taskService";
import { post } from "./api";

import { ApiError } from "../errors/ApiError";
import { DuplicateTaskError } from "../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../errors/UnexpectedApiError";

vi.mock("./api", () => ({
  post: vi.fn(),
}));

const mockedPost = vi.mocked(post);

beforeEach(() => {
  mockedPost.mockReset();
});

describe("createTask", () => {
  it("should create a task successfully", async () => {
    const request = { title: "Test Task" };
    const response = { id: "1", title: "Test Task", completed: false };

    mockedPost.mockResolvedValueOnce(response);

    const result = await createTask(request);
    expect(result).toEqual(response);
    expect(mockedPost).toHaveBeenCalledWith("/tasks", request);
  });

  it("should throw DuplicateTaskError for duplicate task", async () => {
    const request = { title: "Duplicate Task" };

    mockedPost.mockRejectedValueOnce(new ApiError(409, "Request failed."));

    await expect(createTask(request)).rejects.toBeInstanceOf(
      DuplicateTaskError,
    );
  });

  it("throws UnexpectedApiError for other API errors", async () => {
    const request = { title: "Unexpected Error Task" };

    mockedPost.mockRejectedValueOnce(
      new ApiError(500, "Internal Server Error"),
    );

    await expect(createTask(request)).rejects.toBeInstanceOf(
      UnexpectedApiError,
    );
  });

  it("throws UnexpectedApiError for non-ApiError errors", async () => {
    const request = { title: "Non-ApiError Task" };

    mockedPost.mockRejectedValueOnce(new Error("Some other error"));

    await expect(createTask(request)).rejects.toBeInstanceOf(
      UnexpectedApiError,
    );
  });
});
