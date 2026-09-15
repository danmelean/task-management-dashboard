import { post } from "./api";

import { DuplicateTaskError } from "../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../errors/UnexpectedApiError";

import type { CreateTaskRequest } from "../types/CreateTaskRequest";
import type { TaskResponse } from "../types/TaskResponse";
import { ApiError } from "../errors/ApiError";

export async function createTask(
  request: CreateTaskRequest,
): Promise<TaskResponse> {
  try {
    const response = await post<TaskResponse>("/tasks", request);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 409) {
        throw new DuplicateTaskError();
      }
    }
    throw new UnexpectedApiError();
  }
}
