import Papa from "papaparse";

import type { CreateTaskRequest } from "../tasks/types/CreateTaskRequest";
import { validateInputTask } from "./validateInputTask";

interface CsvTaskRow {
  title: string;
}

export function parseTaskCsv(content: string): CreateTaskRequest[] {
  const result = Papa.parse<CsvTaskRow>(content, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data.map((row) => {
    const validation = validateInputTask(row.title);
    return {
      title: validation.value,
      error: validation.error,
    };
  });
}
