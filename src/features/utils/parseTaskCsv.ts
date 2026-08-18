import Papa from "papaparse";

import type { CreateTaskRequest } from "../tasks/types/CreateTaskRequest";

interface CsvTaskRow {
  title: string;
}

export function parseTaskCsv(content: string): CreateTaskRequest[] {
  const result = Papa.parse<CsvTaskRow>(content, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data.map((row) => ({
    title: row.title,
  }));
}
