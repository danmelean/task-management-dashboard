import { afterEach, describe, expect, it, vi } from "vitest";
import { post } from "./api";
import { ApiError } from "../errors/ApiError";

describe("post", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const path = "/tasks";
  const fullUrl = "http://localhost:3001" + path;

  it("sends a POST request and returns the response", async () => {
    const response = { id: "123", title: "Test Task", completed: false };
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const request = { title: "Test Task" };
    const result = await post(path, request);

    expect(result).toEqual(response);
    expect(fetchMock).toHaveBeenCalledWith(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  });

  it("throws an ApiError for non-2xx responses", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    const request = { title: "Test Task" };

    await expect(post(path, request)).rejects.toThrow(ApiError);
  });

  it("preserves the HTTP status code in ApiError", async () => {
    const statusCode = 409;
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(null, { status: statusCode, statusText: "Conflict" }),
    );
    const request = { title: "Test Task" };
    const promise = post(path, request);

    await expect(promise).rejects.toMatchObject({ statusCode });
  });

  it("throw ApiError for a 404 response", async () => {
    const statusCode = 404;
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(null, { status: statusCode, statusText: "Not Found" }),
    );
    const request = { title: "Test Task" };
    const promise = post(path, request);

    await expect(promise).rejects.toMatchObject({ statusCode });
  });
});
