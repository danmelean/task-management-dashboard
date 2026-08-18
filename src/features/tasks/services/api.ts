import { ApiError } from "../errors/ApiError";

const BASE_URL = "http://localhost:3001";

export async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new ApiError(response.status, "Request failed.");
  }
  return response.json();
}
