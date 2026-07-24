"use client";

import { usePlannerStore } from "@/store/planner";
import { useSubjectStore } from "@/store/subjects";
import { useResourceStore } from "@/store/resources";
import { generateRevisionTasks } from "@/lib/revisionSchedule";
import { useEffect, useState } from "react";
type TaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export function TaskModal({
  open,
  onClose,
}: TaskModalProps) {
 const addTask = usePlannerStore((state) => state.addTask);
const updateTask = usePlannerStore((state) => state.updateTask);
const editingTask = usePlannerStore((state) => state.editingTask);
const setEditingTask = usePlannerStore((state) => state.setEditingTask);

const subjects = useSubjectStore((state) => state.subjects);
const resources = useResourceStore((state) => state.resources);

const [subjectId, setSubjectId] = useState("");
const [resourceId, setResourceId] = useState("");
const [goal, setGoal] = useState("");
const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
const [start, setStart] = useState("07:00");
const [end, setEnd] = useState("09:00");
const [targetHours, setTargetHours] = useState(2);
const [priority, setPriority] = useState<
  "Low" | "Medium" | "High"
>("High");

const subjectResources = resources.filter(
  (r) => r.subjectId === subjectId
);

const selectedSubject = subjects.find(
  (s) => s.id === subjectId
);

const selectedResource = resources.find(
  (r) => r.id === resourceId
);
useEffect(() => {
  console.log("Editing Task:", editingTask);
}, [editingTask]);
useEffect(() => {
  if (!editingTask) return;

  setGoal(editingTask.goal ?? editingTask.title);
  setDate(editingTask.date);
  setStart(editingTask.start);
  setEnd(editingTask.end);
  setPriority(editingTask.priority);
  setTargetHours(editingTask.targetHours ?? 2);
  setSubjectId(editingTask.subjectId ?? "");
  setResourceId(editingTask.resourceId ?? "");
}, [editingTask]);
function handleSave() {
  if (!editingTask && (!selectedSubject || !selectedResource)) {
  alert("Please select a subject and resource.");
  return;
}

  const task = {
    id: crypto.randomUUID(),
    title: goal || selectedResource.name,
    exam: selectedSubject.papers.includes("Prelims")
      ? "Prelims"
      : "Mains",
    subject: selectedSubject.name,
    activity: "Study",
    priority,
    start,
    end,
    completed: false,
    date,
    subjectId,
    resourceId,
    goal,
    targetHours,
  };

if (editingTask) {
  updateTask({
    ...editingTask,

    title: goal || selectedResource?.name || editingTask.title,

    subject: selectedSubject?.name || editingTask.subject,

    exam: selectedSubject
      ? selectedSubject.papers.includes("Prelims")
        ? "Prelims"
        : "Mains"
      : editingTask.exam,

    priority,
    start,
    end,
    date,
    goal,
    targetHours,

    subjectId: subjectId || editingTask.subjectId,
    resourceId: resourceId || editingTask.resourceId,
  });

  setEditingTask(null);
} else {
  const studyTask = {
    ...task,
    id: crypto.randomUUID(),
  };

  // Add the main study task
  addTask(studyTask);

  // Generate and add revision tasks
  const revisions = generateRevisionTasks(studyTask);

  revisions.forEach((revision) => addTask(revision));
}

onClose();

}
console.log("TaskModal open:", open);  
if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
  {editingTask ? "Edit Study Task" : "Add Study Task"}
</h2>

          <button
            onClick={() => {
  setEditingTask(null);
  onClose();
}}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

  {/* Subject */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Subject
    </label>

    <select
      value={subjectId}
      onChange={(e) => {
        setSubjectId(e.target.value);
        setResourceId("");
      }}
      className="w-full rounded-lg border bg-background p-3"
    >
      <option value="">Select Subject</option>

      {subjects.map((subject) => (
        <option key={subject.id} value={subject.id}>
          {subject.name}
        </option>
      ))}
    </select>
  </div>

  {/* Resource */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Resource
    </label>

    <select
      value={resourceId}
      onChange={(e) => setResourceId(e.target.value)}
      className="w-full rounded-lg border bg-background p-3"
    >
      <option value="">Select Resource</option>

      {subjectResources.map((resource) => (
        <option key={resource.id} value={resource.id}>
          {resource.name}
        </option>
      ))}
    </select>
  </div>

  {/* Date */}
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full rounded-lg border p-3"
  />

  {/* Time */}
  <div className="grid grid-cols-2 gap-4">
    <input
      type="time"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      className="rounded-lg border p-3"
    />

    <input
      type="time"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
      className="rounded-lg border p-3"
    />
  </div>

  {/* Priority */}
  <select
    value={priority}
    onChange={(e) =>
      setPriority(e.target.value as "Low" | "Medium" | "High")
    }
    className="w-full rounded-lg border p-3"
  >
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
  </select>

  {/* Target Hours */}
  <input
    type="number"
    min={1}
    max={12}
    value={targetHours}
    onChange={(e) =>
      setTargetHours(Number(e.target.value))
    }
    className="w-full rounded-lg border p-3"
  />

  {/* Goal */}
  <textarea
    rows={4}
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
    placeholder="Today's study goal..."
    className="w-full rounded-lg border p-3"
  />

  <div className="flex justify-end gap-3">
    <button
      onClick={() => {
  setEditingTask(null);
  onClose();
}}
      className="rounded-lg border px-5 py-2"
    >
      Cancel
    </button>

    <button
      onClick={handleSave}
      className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
    >
      Save Task
    </button>
  </div>

</div>

      </div>
    </div>
  );
}