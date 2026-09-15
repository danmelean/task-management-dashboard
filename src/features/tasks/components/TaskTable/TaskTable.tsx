import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Task } from "../../types/Task";

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="w-32">Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 hover:bg-blue-100"
                  : "hover:bg-yellow-100"
              }
            >
              <TableCell className="font-mono text-xs text-muted-foreground">
                {task.id}
              </TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Completed
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Pending
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
