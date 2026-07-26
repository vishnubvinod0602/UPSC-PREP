"use client";

import { useEffect, useMemo, useState } from "react";

import { usePlannerStore } from "@/store/planner";
import { useSubjectStore } from "@/store/subjects";
import { useResourceStore } from "@/store/resources";

import { generateRevisionTasks } from "@/lib/revisionSchedule";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export function TaskModal({
  open,
  onClose,
}: TaskModalProps) {
  /* ---------------- Planner Store ---------------- */

  const addTask = usePlannerStore((s) => s.addTask);
  const updateTask = usePlannerStore((s) => s.updateTask);
  const editingTask = usePlannerStore((s) => s.editingTask);
  const setEditingTask = usePlannerStore(
    (s) => s.setEditingTask
  );

  /* ---------------- Subject Store ---------------- */

  const subjects = useSubjectStore((s) => s.subjects);
  const loadSubjects = useSubjectStore(
    (s) => s.loadSubjects
  );

  /* ---------------- Resource Store ---------------- */

  const resources = useResourceStore((s) => s.resources);
  const loadResources = useResourceStore(
    (s) => s.loadResources
  );
  const loadingResources = useResourceStore(
    (s) => s.loading
  );

  /* ---------------- Local State ---------------- */

  const [subjectId, setSubjectId] = useState("");
  const [resourceId, setResourceId] = useState("");

  const [goal, setGoal] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [start, setStart] = useState("07:00");
  const [end, setEnd] = useState("09:00");

  const [targetHours, setTargetHours] =
    useState(2);

  const [priority, setPriority] = useState<
    "Low" | "Medium" | "High"
  >("High");

  /* ---------------- Initial Load ---------------- */

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  /* ---------------- Load Resources ---------------- */

  useEffect(() => {
    if (!subjectId) return;

    const load = async () => {
      await loadResources(subjectId);
    };

    load();
  }, [subjectId, loadResources]);

  /* ---------------- Edit Mode ---------------- */

  useEffect(() => {
    if (!editingTask) return;

    setSubjectId(editingTask.subjectId ?? "");
    setResourceId(editingTask.resourceId ?? "");

    setGoal(
      editingTask.goal ?? editingTask.title
    );

    setDate(editingTask.date);

    setStart(editingTask.start);

    setEnd(editingTask.end);

    setPriority(editingTask.priority);

    setTargetHours(
      editingTask.targetHours ?? 2
    );
  }, [editingTask]);

  /* ---------------- Derived Data ---------------- */

  const selectedSubject = useMemo(
    () =>
      subjects.find(
        (s) => s.id === subjectId
      ),
    [subjects, subjectId]
  );

  const selectedResource = useMemo(
    () =>
      resources.find(
        (r) => r.id === resourceId
      ),
    [resources, resourceId]
  );

  const subjectResources = useMemo(
    () => resources,
    [resources]
  );
/* ---------------- Save Task ---------------- */

function handleSave() {
  if (!selectedSubject) {
    alert("Please select a subject.");
    return;
  }

  if (!selectedResource) {
    alert("Please select a resource.");
    return;
  }

  const exam: "Prelims" | "Mains" =
    selectedSubject.papers.includes("Prelims")
      ? "Prelims"
      : "Mains";

  if (editingTask) {
    updateTask({
      ...editingTask,

      title:
        goal.trim() ||
        selectedResource.name,

      exam,

      subject: selectedSubject.name,

      priority,

      start,
      end,
      date,

      goal,

      targetHours,

      subjectId,

      resourceId,
    });

    setEditingTask(null);

    onClose();

    return;
  }

  const studyTask = {
    id: crypto.randomUUID(),

    title:
      goal.trim() ||
      selectedResource.name,

    exam,

    subject: selectedSubject.name,

    activity: "Study" as const,

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

  addTask(studyTask);

  const revisions =
    generateRevisionTasks(studyTask);

  revisions.forEach((task) =>
    addTask(task)
  );

  // Reset Form
  setSubjectId("");
  setResourceId("");
  setGoal("");

  setDate(
    new Date().toISOString().split("T")[0]
  );

  setStart("07:00");
  setEnd("09:00");

  setTargetHours(2);

  setPriority("High");

  onClose();
}
if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-2xl rounded-2xl bg-background shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-2xl font-bold">
          {editingTask ? "Edit Study Task" : "Add Study Task"}
        </h2>

        <button
          onClick={() => {
            setEditingTask(null);
            onClose();
          }}
          className="text-xl hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">

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
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
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
            onChange={(e) =>
              setResourceId(e.target.value)
            }
            disabled={!subjectId || loadingResources}
            className="w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!subjectId && (
              <option>
                Select Subject First
              </option>
            )}

            {loadingResources && (
              <option>
                Loading Resources...
              </option>
            )}

            {!loadingResources &&
              subjectId && (
                <>
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
                </>
              )}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Start Time
            </label>

            <input
              type="time"
              value={start}
              onChange={(e) =>
                setStart(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              End Time
            </label>

            <input
              type="time"
              value={end}
              onChange={(e) =>
                setEnd(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as
                  | "Low"
                  | "Medium"
                  | "High"
              )
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>
        </div>

        {/* Target Hours */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Target Hours
          </label>

          <input
            type="number"
            min={1}
            max={12}
            value={targetHours}
            onChange={(e) =>
              setTargetHours(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Study Goal
          </label>

          <textarea
            rows={4}
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            placeholder="Today's study goal..."
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t p-6">

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
          {editingTask
            ? "Update Task"
            : "Save Task"}
        </button>

      </div>

    </div>
  </div>
);
}