"use client";

import { useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskTable } from "../TaskTable";

export function TaskDashboard() {
  const [tasks, setTasks] = useState<string[]>([]);

  function handleAddTask(title: string) {
    setTasks((currentTasks) => [...currentTasks, title]);
  }

  return (
    <>
      <TaskInput onAddTask={handleAddTask} />

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Tasks:</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          <TaskTable tasks={tasks} />
        )}
      </div>
    </>
  );
}
