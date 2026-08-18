export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
