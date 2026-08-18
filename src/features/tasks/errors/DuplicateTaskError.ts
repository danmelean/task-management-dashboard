import { ApiError } from "./ApiError";

export class DuplicateTaskError extends ApiError {
  constructor() {
    super(409, "Task already exists");
    this.name = "DuplicateTaskError";
  }
}
