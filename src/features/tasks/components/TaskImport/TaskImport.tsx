"use client";

import { parseTaskCsv } from "@/features/utils/parseTaskCsv";
import { useState } from "react";
import { CreateTaskRequest } from "../../types/CreateTaskRequest";

export function TaskImport() {
  const [file, setFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<CreateTaskRequest[]>([]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    const contents = await selectedFile.text();

    console.log("File contents:", contents);

    const parsedTasks = parseTaskCsv(contents);

    setTasks(parsedTasks);
  }

  return (
    <div className="mt-4 p-4 border rounded-md bg-blue-50">
      <label
        htmlFor="task-import"
        className="block text-sm font-medium text-gray-700"
      >
        Import Tasks
      </label>
      <input
        type="file"
        id="task-import"
        accept=".csv"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white p-2 cursor-pointer"
        onChange={handleFileChange}
      />
      {file && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <p className="mt-2 text-sm text-gray-600">Name: {file.name}</p>
          <p className="mt-2 text-sm text-gray-600">
            Size: {Math.round(file.size / 1024)} KB
          </p>
          <p className="mt-2 text-sm text-gray-600">Type: {file.type}</p>
          {tasks.length > 0 && (
            <div className="mt-2 p-2 border rounded-md bg-white">
              <h3>Import Preview</h3>
              <ul className="list-disc pl-5">
                {tasks.map((task, index) => (
                  <li key={index}>{task.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
