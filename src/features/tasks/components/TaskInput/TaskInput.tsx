import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

interface TaskInputProps {
  onAddTask(title: string): void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");

  function handleAddTask() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle);
    setTitle("");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <div className="flex gap-2">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="What do you need to do?"
        className="flex-1"
      />
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  );
}
