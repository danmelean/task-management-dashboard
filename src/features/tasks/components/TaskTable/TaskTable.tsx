import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface TaskTableProps {
  tasks: string[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Task</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-blue-100" : "hover:bg-yellow-100"}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{task}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
