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
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <TaskInput onAddTask={handleAddTask} />
            <TaskImport onAddTask={handleAddTask} />
          </div>
          <div className="w-full md:w-2/3">
            <Card className="p-4 mb-4">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">Tasks:</h3>

                {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks yet.</p>
                ) : (
                  <TaskTable tasks={tasks} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
