"use client";

import { useState } from "react";
import { usePlannerStore } from "@/store/planner";
import { TaskCard } from "./TaskCard";

export function MonthView() {
  const tasks = usePlannerStore((state) => state.tasks);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: {
    day: number;
    date: string;
    taskCount: number;
  }[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push({
      day: 0,
      date: "",
      taskCount: 0,
    });
  }

  // Calendar days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
      .toISOString()
      .split("T")[0];

    cells.push({
      day,
      date,
      taskCount: tasks.filter((task) => task.date === date).length,
    });
  }

  const selectedTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="rounded-2xl border bg-card p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() =>
              setCurrentMonth(new Date(year, month - 1, 1))
            }
            className="rounded-lg border px-4 py-2 hover:bg-muted"
          >
            ← Previous
          </button>

          <h2 className="text-2xl font-bold">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="rounded-lg border px-4 py-2 hover:bg-muted"
            >
              Today
            </button>

            <button
              onClick={() =>
                setCurrentMonth(new Date(year, month + 1, 1))
              }
              className="rounded-lg border px-4 py-2 hover:bg-muted"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Week Days */}
        <div className="mb-4 grid grid-cols-7 text-center font-semibold">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3">
          {cells.map((cell, index) =>
            cell.day === 0 ? (
              <div key={index}></div>
            ) : (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedDate(cell.date)}
                className={`min-h-[90px] rounded-xl border p-3 text-left transition ${
                  selectedDate === cell.date
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:border-primary hover:bg-primary/5"
                }`}
              >
                <div className="font-semibold">
                  {cell.day}
                </div>

                {cell.taskCount > 0 && (
                  <div className="mt-3 rounded-full bg-primary/20 px-2 py-1 text-xs">
                    {cell.taskCount} task
                    {cell.taskCount > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Selected Day Tasks */}
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Tasks for {selectedDate}
        </h3>

        {selectedTasks.length === 0 ? (
          <p className="text-muted-foreground">
            No tasks scheduled.
          </p>
        ) : (
          <div className="space-y-4">
            {selectedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                view="month"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}