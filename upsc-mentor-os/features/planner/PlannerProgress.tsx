"use client";

import { usePlannerStore } from "@/store/planner";

export function PlannerProgress() {
  const { tasks } = usePlannerStore();

  const completed = tasks.filter((t) => t.completed).length;
  const percentage =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">
          Today's Progress
        </span>

        <span className="text-sm text-muted-foreground">
          {percentage}%
        </span>
      </div>

      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}