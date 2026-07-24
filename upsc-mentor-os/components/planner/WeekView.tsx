"use client";

import { useState } from "react";
import { usePlannerStore } from "@/store/planner";
import { TaskCard } from "./TaskCard";

export function WeekView() {
  const tasks = usePlannerStore((state) => state.tasks);

  const [currentWeek, setCurrentWeek] = useState(new Date());

  const startOfWeek = new Date(currentWeek);
  startOfWeek.setDate(
    currentWeek.getDate() - currentWeek.getDay()
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const weekDays = [...Array(7)].map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const dateString = date.toISOString().split("T")[0];

    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      day: date.getDate(),
      dateString,
      selected: dateString === selectedDate,
      tasks: tasks.filter((task) => task.date === dateString),
    };
  });

  const selectedTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentWeek(
              new Date(
                currentWeek.getFullYear(),
                currentWeek.getMonth(),
                currentWeek.getDate() - 7
              )
            )
          }
          className="rounded-lg border px-4 py-2 hover:bg-muted"
        >
          ← Previous Week
        </button>

        <h2 className="text-xl font-bold">
          Week of{" "}
          {startOfWeek.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="rounded-lg border px-4 py-2 hover:bg-muted"
          >
            Today
          </button>

          <button
            onClick={() =>
              setCurrentWeek(
                new Date(
                  currentWeek.getFullYear(),
                  currentWeek.getMonth(),
                  currentWeek.getDate() + 7
                )
              )
            }
            className="rounded-lg border px-4 py-2 hover:bg-muted"
          >
            Next Week →
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div
            key={day.dateString}
            onClick={() => setSelectedDate(day.dateString)}
            className={`cursor-pointer rounded-xl border p-4 transition ${
              day.selected
                ? "border-primary bg-primary/10"
                : "bg-card hover:border-primary/50"
            }`}
          >
            <h3 className="font-semibold">{day.label}</h3>

            <p className="mb-3 text-sm text-muted-foreground">
              {day.day}
            </p>

            {day.tasks.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No tasks
              </p>
            ) : (
              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg bg-muted p-2 text-sm"
                  >
                    <p className="font-medium">
                      {task.subject}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {task.start} - {task.end}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Day Tasks */}
      <div className="rounded-xl border bg-card p-6">
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
                view="week"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}