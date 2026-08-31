"use client";

import { parseTaskCsv } from "@/features/utils/parseTaskCsv";
import React, { useState } from "react";
import { CreateTaskRequest } from "../../types/CreateTaskRequest";
import { Button } from "@/components/ui/Button";
import { DuplicateTaskError } from "../../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../../errors/UnexpectedApiError";

interface TaskInputProps {
  onAddTask(title: string): Promise<void>;
}

export function TaskImport({ onAddTask }: TaskInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<CreateTaskRequest[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    const contents = await selectedFile.text();

    console.log("File contents:", contents);

    const parsedTasks = parseTaskCsv(contents);

    parsedTasks.find((task) => task.error !== null)
      ? setHasError(true)
      : setHasError(false);

    setTasks(parsedTasks);
  }

  async function handleAddTask() {
    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      tasks.forEach(async (task) => {
        await onAddTask(task.title);
      });
      setFile(null);
      setTasks([]);
      setSuccessMessage(`Tasks added successfully!`);
    } catch (error) {
      if (error instanceof DuplicateTaskError) {
        setApiError(error.message);
        return;
      }

      if (error instanceof UnexpectedApiError) {
        setApiError(error.message);
        return;
      }

      setApiError("An error occurred while adding the task");
    } finally {
      setIsLoading(false);
    }
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
                  <li key={index}>
                    {task.title}
                    {task.error && (
                      <>
                        <span className="text-red-500"> - {task.error}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {!hasError && (
                <Button onClick={handleAddTask} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Task"}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
    </div>
  );
}
