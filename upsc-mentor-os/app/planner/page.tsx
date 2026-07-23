"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import type { Subject } from "@/lib/types/subject";
import { useState } from "react";
import { useResourceStore } from "@/store/resources";
import { useSubjectStore } from "@/store/subjects";
import { usePlannerStore } from "@/store/planner";

export default function PlannerPage() {
  const [selectedSubject, setSelectedSubject] =
  useState<Subject | null>(null);
  const addTask = usePlannerStore((state) => state.addTask);
  const resources = useResourceStore((state) => state.resources);
 const subjects = useSubjectStore((state) => state.subjects);
 const tasks = usePlannerStore((state) => state.tasks);

  const subjectResources = selectedSubject
  ? resources.filter(
      (resource) => resource.subjectId === selectedSubject.id
    )
  : [];
  const [selectedResourceId, setSelectedResourceId] = useState("");
const [targetHours, setTargetHours] = useState(2);
const [goal, setGoal] = useState("");
const [startTime, setStartTime] = useState("07:00");
const [endTime, setEndTime] = useState("09:00");
const [priority, setPriority] = useState<
  "Low" | "Medium" | "High"
>("High");
function handleAddTask() {
  if (!selectedSubject || !selectedResourceId) {
    alert("Please select a resource.");
    
    return;
  }

  const resource = subjectResources.find(
    (r) => r.id === selectedResourceId
  );

  addTask({
    id: crypto.randomUUID(),

    title: goal || resource?.name || "Study",

    exam: selectedSubject.papers.includes("Prelims")
      ? "Prelims"
      : "Mains",

    subject: selectedSubject.name,

    activity: "Study",

   priority,

start: startTime,
end: endTime,

    completed: false,

    date: new Date().toISOString().split("T")[0],

    subjectId: selectedSubject.id,
    resourceId: selectedResourceId,

    goal,
    targetHours,
  });

  setSelectedResourceId("");
  setGoal("");
  setTargetHours(2);
  setStartTime("07:00");
setEndTime("09:00");
setPriority("High");
}
const today = new Date().toISOString().split("T")[0];

const todaysTasks = tasks.filter(
  (task) => task.date === today
);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <PageContainer>
          <div className="mb-8">
            <PageTitle
              title="Planner"
              subtitle="Create and manage your UPSC study plan."
            />
          </div>

          <div className="grid grid-cols-12 gap-6">

  {/* Left Panel */}
  <div className="col-span-5">
    <div className="grid gap-4">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          onClick={() => setSelectedSubject(subject)}
          className={`cursor-pointer rounded-2xl border p-6 shadow-sm transition-all ${
            selectedSubject?.id === subject.id
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50"
          }`}
        >
          <h2 className="text-lg font-semibold">
            {subject.name}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {subject.papers.map((paper) => (
              <span
                key={paper}
                className="rounded-md bg-primary/10 px-2 py-1 text-xs"
              >
                {paper}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>

<div className="col-span-7">
  <div className="rounded-2xl border bg-card p-6 min-h-[600px]">
    {selectedSubject ? (
      <>
  <h2 className="text-2xl font-bold">
    {selectedSubject.name}
  </h2>

  <div className="mt-4 flex flex-wrap gap-2">
    {selectedSubject.papers.map((paper) => (
      <span
        key={paper}
        className="rounded-md bg-primary/10 px-2 py-1 text-xs"
      >
        {paper}
      </span>
    ))}
  </div>

  <div className="mt-8 space-y-6">

  {/* Resource */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Resource
    </label>

    <select
      value={selectedResourceId}
      onChange={(e) => setSelectedResourceId(e.target.value)}
      className="w-full rounded-lg border bg-background p-3"
    >
      <option value="">
        Select Resource
      </option>

      {subjectResources.map((resource) => (
        <option
          key={resource.id}
          value={resource.id}
        >
          {resource.name}
        </option>
      ))}
    </select>
  </div>

  {/* Target Hours */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Target Hours
    </label>
<div>
  <label className="mb-2 block text-sm font-medium">
    Start Time
  </label>

  <input
    type="time"
    value={startTime}
    onChange={(e) => setStartTime(e.target.value)}
    className="w-full rounded-lg border bg-background p-3"
  />
</div>
<div>
  <label className="mb-2 block text-sm font-medium">
    End Time
  </label>

  <input
    type="time"
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
    className="w-full rounded-lg border bg-background p-3"
  />
</div>
<div>
  <label className="mb-2 block text-sm font-medium">
    Priority
  </label>

  <select
    value={priority}
    onChange={(e) =>
      setPriority(
        e.target.value as "Low" | "Medium" | "High"
      )
    }
    className="w-full rounded-lg border bg-background p-3"
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>
    <input
      type="number"
      min={1}
      max={12}
      value={targetHours}
      onChange={(e) =>
        setTargetHours(Number(e.target.value))
      }
      className="w-full rounded-lg border bg-background p-3"
    />
  </div>

  {/* Goal */}
  <div>
   <label className="mb-2 block text-sm font-medium">
  Today's Goal
</label>

<textarea
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  rows={4}
  className="w-full rounded-lg border bg-background p-3"
  placeholder="Finish Revolt of 1857..."
/>

<div className="pt-2">
  <button
    onClick={handleAddTask}
    className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:opacity-90"
  >
    Add to Today's Plan
  </button>
</div>

<div className="mt-8">
  <h3 className="mb-4 text-lg font-semibold">
    Today's Plan
  </h3>

  <div className="space-y-3">
    {todaysTasks.map((task) => (
      <div
        key={task.id}
        className="rounded-lg border p-4"
      >
        <p className="font-medium">
          {task.title}
        </p>

        <p className="text-sm text-muted-foreground">
          {task.subject}
        </p>

        <p className="text-xs text-muted-foreground">
          {task.start} - {task.end}
        </p>
      </div>
    ))}

    {todaysTasks.length === 0 && (
      <p className="text-sm text-muted-foreground">
        No tasks planned for today.
      </p>
    )}
  </div>
</div>
  </div>

</div>
</>
    ) : (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a subject to start planning.
      </div>
    )}
  </div>
</div>

</div>
        </PageContainer>
      </main>
    </div>
  );
}
     