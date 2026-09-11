"use client";

import { useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskTable } from "../TaskTable";
import { createTask } from "../../services/taskService";
import type { Task } from "../../types/Task";
import { TaskImport } from "../TaskImport/TaskImport";
import { Card, CardContent } from "@/components/ui/card";

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleAddTask(title: string): Promise<void> {
    const task = await createTask({ title });

    setTasks((currentTasks) => [...currentTasks, task]);
  }

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-start">
          <div className="w-full md:w-1/3">
            <TaskInput onAddTask={handleAddTask} />
          </div>
          <div className="w-full md:w-2/3">
            <TaskImport onAddTask={handleAddTask} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-6 mb-2">Tasks:</h3>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet.</p>
          ) : (
            <TaskTable tasks={tasks} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
