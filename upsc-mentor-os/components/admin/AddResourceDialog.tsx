"use client";

import { useEffect, useState } from "react";
import { useResourceStore } from "@/store/resources";
import { useSubjectStore } from "@/store/subjects";
import type { Resource } from "@/lib/types/resource";

interface Props {
  open: boolean;
  onClose: () => void;
  resource?: Resource | null;
}

export default function AddResourceDialog({
  open,
  onClose,
  resource,
}: Props) {
 const { addResource, updateResource, resources } = useResourceStore();
  const { subjects } = useSubjectStore();

  const [subjectId, setSubjectId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Book");
  const [priority, setPriority] = useState("Essential");
  const [active, setActive] = useState(true);
useEffect(() => {
  if (!resource) return;

  setName(resource.name);
  setSubjectId(resource.subjectId);
  setCategory(resource.category);
  setPriority(resource.priority);
  setActive(resource.active);
}, [resource]);
  if (!open) return null;

 function handleSave() {
  if (!name || !subjectId) return;

  if (resource) {
    updateResource(resource.id, {
      subjectId,
      name,
      category: category as any,
      priority: priority as any,
      active,
    });
  } else {
    addResource({
      id: crypto.randomUUID(),
      subjectId,
      name,
      category: category as any,
      priority: priority as any,
      active,
    });
  }

  setSubjectId("");
  setName("");
  setCategory("Book");
  setPriority("Essential");
  setActive(true);

  onClose();
}
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-xl bg-card p-6 shadow-xl">

        <h2 className="mb-6 text-xl font-bold">
          Add Resource
        </h2>

        <select
          className="mb-4 w-full rounded border p-2"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </option>
          ))}
        </select>

        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="mb-4 w-full rounded border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Book</option>
          <option>NCERT</option>
          <option>Notes</option>
          <option>Video</option>
          <option>Website</option>
          <option>PYQ</option>
          <option>Test Series</option>
        </select>

        <select
          className="mb-6 w-full rounded border p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Essential</option>
          <option>Recommended</option>
          <option>Reference</option>
        </select>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded bg-primary px-4 py-2 text-primary-foreground"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}