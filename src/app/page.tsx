import { AppLayout } from "@/components/layout/AppLayout";
import { TaskDashboard } from "@/features/tasks/components/TaskDashboard";

export default function HomePage() {
  return (
    <AppLayout>
      <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
      <TaskDashboard />
    </AppLayout>
  );
}
