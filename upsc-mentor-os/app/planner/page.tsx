"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import { useState } from "react";
import { usePlannerStore } from "@/store/planner";
import { TodayTasks } from "@/components/planner/TodayTasks";
import { DailyProgress } from "@/components/planner/DailyProgress";
import { TaskModal } from "@/components/planner/TaskModal";
import { WeekView } from "@/components/planner/WeekView";
import { MonthView } from "@/components/planner/MonthView";

export default function PlannerPage() {
  const isTaskModalOpen = usePlannerStore(
  (state) => state.isTaskModalOpen
);

const setTaskModalOpen = usePlannerStore(
  (state) => state.setTaskModalOpen
);

  const [plannerView, setPlannerView] = useState<
    "today" | "week" | "month"
  >("today");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1">
        <Header />

      <PageContainer>

        <div className="flex items-center justify-between mb-8">
          <PageTitle
            title="Planner"
            subtitle="Create and manage your UPSC study plan."
          />

          <button
  onClick={() => {
    alert("Button clicked");
    setTaskModalOpen(true)
  }}
  className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
>
  + Add Study Task
</button>
        </div>

        <div className="mb-6 flex gap-2 rounded-xl border bg-card p-2 w-fit">
          <button
            onClick={() => setPlannerView("today")}
            className={`rounded-lg px-4 py-2 ${
              plannerView === "today"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            📅 Today
          </button>

          <button
            onClick={() => setPlannerView("week")}
            className={`rounded-lg px-4 py-2 ${
              plannerView === "week"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            📆 Week
          </button>

          <button
            onClick={() => setPlannerView("month")}
            className={`rounded-lg px-4 py-2 ${
              plannerView === "month"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            🗓 Month
          </button>
        </div>

                <div className="space-y-6">
          {plannerView === "today" && (
            <>
              <DailyProgress />
              <TodayTasks />
            </>
          )}

          {plannerView === "week" && <WeekView />}

          {plannerView === "month" && <MonthView />}
        </div>
<TaskModal
  open={isTaskModalOpen}
  onClose={() => setTaskModalOpen(false)}
/>
      </PageContainer>
    </main>
  </div>
  );
}