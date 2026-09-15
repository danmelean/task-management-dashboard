import { describe, expect, it } from "vitest";
import { parseTaskCsv } from "./parseTaskCsv";

describe("parseTaskCsv", () => {
  it("parses valid tasks", () => {
    const csv = `title
        Buy milk
        Walk the dog
        Read a book`;
    const result = parseTaskCsv(csv);
    expect(result).toEqual([
      { title: "Buy milk", error: null },
      { title: "Walk the dog", error: null },
      { title: "Read a book", error: null },
    ]);
  });

  it("trim task titles and handles whitespace", () => {
    const csv = `title
        Buy milk  
        Walk the dog
        Read a book   `;
    const result = parseTaskCsv(csv);
    expect(result).toEqual([
      { title: "Buy milk", error: null },
      { title: "Walk the dog", error: null },
      { title: "Read a book", error: null },
    ]);
  });

  it("returns validation errors for invalid tasks", () => {
    const csv = `title
    Buy milk
    x
    Read a book`;
    const result = parseTaskCsv(csv);
    expect(result).toEqual([
      { title: "Buy milk", error: null },
      { title: "x", error: "Title must be at least 3 characters long" },
      { title: "Read a book", error: null },
    ]);
  });

  it("handles empty lines", () => {
    const csv = `title
    Buy milk

    Walk the dog

    Read a book`;
    const result = parseTaskCsv(csv);
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { title: "Buy milk", error: null },
      { title: "Walk the dog", error: null },
      { title: "Read a book", error: null },
    ]);
  });
});
