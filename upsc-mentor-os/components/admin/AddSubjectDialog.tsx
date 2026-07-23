"use client";

import { useState, useEffect } from "react";
import { useSubjectStore } from "@/store/subjects";
import type { Subject } from "@/lib/types/subject";


interface Props {
  open: boolean;
  onClose: () => void;
  subject?: Subject | null;
}

const PAPERS = [
  "Prelims",
  "Essay",
  "GS I",
  "GS II",
  "GS III",
  "GS IV",
  "Optional",
  "CSAT",
  "Interview",
];

export default function AddSubjectDialog({
  open,
  onClose,
  subject,
}: Props) {
const { subjects, addSubject, updateSubject } = useSubjectStore();

  const [name, setName] = useState("");
  const [papers, setPapers] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  useEffect(() => {
  if (subject) {
    setName(subject.name);
    setPapers(subject.papers);
    setActive(subject.active);
  } else {
    setName("");
    setPapers([]);
    setActive(true);
  }
}, [subject]);

  if (!open) return null;

  function togglePaper(paper: string) {
    setPapers((prev) =>
      prev.includes(paper)
        ? prev.filter((p) => p !== paper)
        : [...prev, paper]
    );
  }

  function handleSave() {
  if (!name.trim()) return;

  if (subject) {
    updateSubject(subject.id, {
      name,
      papers,
      active,
    });
  } else {
    const id = name
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Prevent duplicate subjects
    if (subjects.some((s) => s.id === id)) {
      alert("A subject with this name already exists.");
      return;
    }

    addSubject({
      id,
      name,
      papers,
      active,
    });
  }

  setName("");
  setPapers([]);
  setActive(true);

  onClose();
}

 return (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
    <div className="w-full max-w-xl rounded-xl border bg-background p-6 shadow-2xl">

        <h2 className="text-xl font-bold">
          Add Subject
        </h2>

        <input
          className="w-full rounded border p-2"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          {PAPERS.map((paper) => (
            <label key={paper} className="flex gap-2">
              <input
                type="checkbox"
                checked={papers.includes(paper)}
                onChange={() => togglePaper(paper)}
              />
              {paper}
            </label>
          ))}
        </div>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
          />
          Active
        </label>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}