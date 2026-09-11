"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, FileUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useDropzone, FileRejection } from "react-dropzone";
import { DuplicateTaskError } from "../../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../../errors/UnexpectedApiError";
import { parseTaskCsv, type ParsedTask } from "@/features/utils/parseTaskCsv";

interface TaskInputProps {
  onAddTask(title: string): Promise<void>;
}

export function TaskImport({ onAddTask }: TaskInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<ParsedTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [rejectionError, setRejectionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isLoading,
  });

  async function handleDrop(acceptedFiles: File[]) {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      return;
    }

    setApiError(null);
    setRejectionError(null);
    setSuccessMessage(null);

    setFile(selectedFile);
    const contents = await selectedFile.text();
    const parsedTasks = parseTaskCsv(contents);
    setTasks(parsedTasks);
  }

  const validTaskCount = tasks.filter((task) => !task.error).length;
  const invalidTaskCount = tasks.length - validTaskCount;

  function handleDropRejected(rejectedFiles: FileRejection[]) {
    const rejection = rejectedFiles[0];

    if (!rejection) {
      return;
    }

    const error = rejection.errors[0];

    if (error.code === "file-too-large") {
      setRejectionError("File is too large. Max size: 5MB.");
      return;
    } else if (error.code === "file-invalid-type") {
      setRejectionError("Invalid file type. Only CSV files are accepted.");
      return;
    } else {
      setRejectionError("An error occurred while uploading the file.");
    }
  }

  async function handleAddTask() {
    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      for (const task of tasks) {
        await onAddTask(task.title);
      }
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Import Tasks</CardTitle>
        <CardDescription>
          Upload a CSV file to import multiple tasks at once.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">CSV File</p>
          <div
            {...getRootProps()}
            className={`min-h-40 cursor-pointer items-center justify-center rounded-lg border-2 
              border-dashed p-6 text-center transition-colors 
              ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25 hover:border-primary-50 hover:bg-muted/30"
              }
              ${isLoading ? "pointer-events-none opacity-50" : ""}
            `}
          >
            <input {...getInputProps()} />

            {isDragActive ? (
              <>
                <p className="text-sm font-medium">Drop the CSV file here...</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {" "}
                  Release to upload.
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm font-medium">
                    Drag & drop your CSV here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">or</p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={(event) => {
                      event.stopPropagation();
                      open();
                    }}
                    disabled={isLoading}
                  >
                    Browse File
                  </Button>
                </div>
                <div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Only CSV files are accepted. Max size: 5MB.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {rejectionError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>File Upload Error</AlertTitle>
            <AlertDescription>{rejectionError}</AlertDescription>
          </Alert>
        )}

        {file && (
          <div className="mt-6 rounded-lg border bg-muted/30 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">{file.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {Math.round(file.size / 1024)} KB
                </p>
                <Badge variant="secondary" className="text-sm">
                  CSV
                </Badge>
              </div>
            </div>

            {tasks.length > 0 && (
              <div className="mt-4 rounded-lg border bg-background p-4">
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Import Preview</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {validTaskCount} valid
                      {invalidTaskCount > 0 && (
                        <Badge variant="destructive" className="ml-1">
                          {invalidTaskCount} invalid
                        </Badge>
                      )}
                    </Badge>
                  </div>
                </div>
                <ul className="mt-3 divide-y rounded-md border">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 px-3 py-3 text-sm"
                    >
                      {task.error ? (
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      ) : (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      )}
                      <div>
                        <p className="font-medium">{task.title}</p>

                        {task.error && (
                          <p className="mt-1 text-xs text-destructive">
                            - {task.error}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {invalidTaskCount === 0 && (
                  <Button
                    className="mt-4"
                    onClick={handleAddTask}
                    disabled={isLoading}
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    {isLoading
                      ? "Adding..."
                      : `Add ${tasks.length} Task${tasks.length > 1 ? "s" : ""}`}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        {invalidTaskCount > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {invalidTaskCount} task {invalidTaskCount > 1 ? "s" : ""} need
              attention
            </AlertTitle>
            <AlertDescription>
              Fix the invalid rows before impporting your tasks.
            </AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert className="mt-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Import Successful</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
