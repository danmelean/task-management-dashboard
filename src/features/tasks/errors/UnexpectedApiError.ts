import { ApiError } from "./ApiError";

export class UnexpectedApiError extends ApiError {
  constructor() {
    super(500, "An unexpected error occurred");
    this.name = "UnexpectedApiError";
  }
}
