"use client";

import { usePlannerStore } from "@/store/planner";

export function DailyProgress() {
  const tasks = usePlannerStore((state) => state.tasks);

  const today = new Date().toISOString().split("T")[0];

  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  const completedTasks = todaysTasks.filter(
    (task) => task.completed
  );

  const totalTasks = todaysTasks.length;

  const totalHours = todaysTasks.reduce(
    (sum, task) => sum + (task.targetHours ?? 0),
    0
  );

  const completedHours = completedTasks.reduce(
    (sum, task) => sum + (task.targetHours ?? 0),
    0
  );

  const completion =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks.length / totalTasks) * 100
        );

  return (
    <div className="mb-6 rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          📊 Today's Progress
        </h3>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {completion}%
        </span>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${completion}%`,
          }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border p-4 text-center">
          <div className="text-3xl">✅</div>

          <p className="mt-2 text-sm text-muted-foreground">
            Completed
          </p>

          <p className="text-2xl font-bold">
            {completedTasks.length}/{totalTasks}
          </p>
        </div>

        <div className="rounded-xl border p-4 text-center">
          <div className="text-3xl">⏰</div>

          <p className="mt-2 text-sm text-muted-foreground">
            Study Hours
          </p>

          <p className="text-2xl font-bold">
            {completedHours}/{totalHours}
          </p>
        </div>

        <div className="rounded-xl border p-4 text-center">
          <div className="text-3xl">🎯</div>

          <p className="mt-2 text-sm text-muted-foreground">
            Completion
          </p>

          <p className="text-2xl font-bold">
            {completion}%
          </p>
        </div>
      </div>
    </div>
  );
}