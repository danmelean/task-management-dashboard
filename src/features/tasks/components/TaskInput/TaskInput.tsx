import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { DuplicateTaskError } from "../../errors/DuplicateTaskError";
import { UnexpectedApiError } from "../../errors/UnexpectedApiError";
import { validateInputTask } from "@/features/utils/validateInputTask";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TaskInputProps {
  onAddTask(title: string): Promise<void>;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const validation = validateInputTask(title);
  const error = apiError ?? (isTouched ? validation.error : null);

  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);

    if (apiError) {
      setApiError(null);
    }

    if (!isTouched) {
      setIsTouched(true);
    }
  }

  function handleBlur() {
    setIsTouched(true);
  }

  async function handleAddTask() {
    setIsTouched(true);
    if (validation.error) return;

    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await onAddTask(validation.value);

      setTitle("");
      setIsTouched(false);
      setSuccessMessage(`Task "${validation.value}" added successfully!`);
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
    <Card className="p-4 mb-4">
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            placeholder="What do you need to do?"
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleAddTask} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Task"}
          </Button>
        </div>
        <div className="mt-2">
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-2">
              <Check className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
