import { TaskCard } from "./TaskCard";
import { usePlannerStore } from "@/store/planner";

export function TodayTasks() {
  const tasks = usePlannerStore((state) => state.tasks);

  const today = new Date().toISOString().split("T")[0];

  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold">
        Today's Plan
      </h3>

      <div className="space-y-3">
        {todaysTasks.length === 0 ? (
          <p className="text-muted-foreground">
            No tasks planned.
          </p>
        ) : (
          todaysTasks.map((task) => (
            <TaskCard
  key={task.id}
  task={task}
  view="today"
/>
          ))
        )}
      </div>
    </div>
  );
}