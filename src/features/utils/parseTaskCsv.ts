import Papa from "papaparse";

import { validateInputTask } from "./validateInputTask";

interface CsvTaskRow {
  title: string;
}

export interface ParsedTask {
  title: string;
  error: string | null;
}

export function parseTaskCsv(content: string): ParsedTask[] {
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
