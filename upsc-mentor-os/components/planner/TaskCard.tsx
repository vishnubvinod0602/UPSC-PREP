"use client";

import { usePlannerStore } from "@/store/planner";
import type { PlannerTask } from "@/store/planner";

interface TaskCardProps {
  task: PlannerTask;
  view?: "today" | "week" | "month";
}

export function TaskCard({
  task,
  view = "today",
}: TaskCardProps) {
  const toggleTask = usePlannerStore((state) => state.toggleTask);
  const deleteTask = usePlannerStore((state) => state.deleteTask);
  const setTaskModalOpen = usePlannerStore(
    (state) => state.setTaskModalOpen
  );
  const setEditingTask = usePlannerStore(
    (state) => state.setEditingTask
  );

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`font-semibold ${
              task.completed
                ? "line-through text-muted-foreground"
                : ""
            }`}
          >
            {task.title}
          </p>

          <p className="text-sm text-muted-foreground">
            {task.subject}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
  <span
    className={`rounded-full px-2 py-1 text-xs font-medium ${
      task.activity === "Study"
        ? "bg-blue-100 text-blue-700"
        : task.activity === "Revision"
        ? "bg-yellow-100 text-yellow-700"
        : task.activity === "MCQ Practice"
        ? "bg-green-100 text-green-700"
        : task.activity === "PYQ Practice"
        ? "bg-purple-100 text-purple-700"
        : task.activity === "Answer Writing"
        ? "bg-orange-100 text-orange-700"
        : task.activity === "Test"
        ? "bg-red-100 text-red-700"
        : task.activity === "Class"
        ? "bg-cyan-100 text-cyan-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {task.activity}
  </span>

  <span
    className={`rounded-full px-2 py-1 text-xs font-medium ${
      task.priority === "High"
        ? "bg-red-100 text-red-700"
        : task.priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {task.priority}
  </span>
</div>

          <p className="text-xs text-muted-foreground">
            {task.start} - {task.end}
          </p>

          {task.goal && (
            <p className="mt-2 text-sm">
              {task.goal}
            </p>
          )}

          {task.targetHours && (
            <p className="mt-1 text-xs text-muted-foreground">
              🎯 Target: {task.targetHours} hrs
            </p>
          )}
        </div>

        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
          {view.toUpperCase()}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5"
        />

        <button
          onClick={() => {
            setEditingTask(task);
            setTaskModalOpen(true);
          }}
          className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}