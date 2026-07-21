import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

interface TaskInputProps {
  onAddTask(title: string): void;
}

interface ValidationResult {
  value: string;
  error: string | null;
}

function validate(title: string): ValidationResult {
  const value = title.trim();
  if (!value) {
    return {
      value,
      error: "Title cannot be empty",
    };
  }

  if (value.length > 20) {
    return {
      value,
      error: "Title cannot exceed 20 characters",
    };
  }

  if (value.length < 3) {
    return {
      value,
      error: "Title must be at least 3 characters long",
    };
  }

  return { value, error: null };
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validation = validate(title);
  const error = isTouched ? validation.error : null;

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

    if (!isTouched) {
      setIsTouched(true);
    }
  }

  function handleBlur() {
    setIsTouched(true);
  }

  function handleAddTask() {
    setIsTouched(true);
    const validation = validate(title);
    if (validation.error) return;

    onAddTask(validation.value);

    setTitle("");
    setIsTouched(false);
    setSuccessMessage(`Task "${validation.value}" added successfully!`);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          placeholder="What do you need to do?"
          className="flex-1"
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      {error ? (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      ) : (
        successMessage && (
          <p className="text-green-500 text-sm mt-1">{successMessage}</p>
        )
      )}
    </>
  );
}
