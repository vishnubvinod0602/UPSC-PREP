"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";

import { usePlannerStore } from "@/store/planner";

import { PlannerStats } from "@/features/planner/PlannerStats";

import { PlannerProgress } from "@/features/planner/PlannerProgress";

export default function PlannerPage() {
  const { tasks, toggleTask } = usePlannerStore();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <PageContainer>
          <PageTitle
            title="Planner"
            subtitle="Plan and manage your daily UPSC study schedule."
          />
        

<PlannerStats />

<PlannerProgress />


          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {task.title}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.start} — {task.end}
                  </p>
                </div>

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    task.completed
                      ? "bg-green-600 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {task.completed ? "Completed ✓" : "Mark Complete"}
                </button>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="rounded-2xl border border-dashed p-12 text-center">
                <h3 className="text-lg font-semibold">
                  No tasks planned
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Add your first study session.
                </p>
              </div>
            )}
          </div>
        </PageContainer>
      </main>
    </div>
  );
}