"use client";

import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSubjectStore } from "@/store/subjects";
import { useState } from "react";
import AddSubjectDialog from "@/components/admin/AddSubjectDialog";
import AddResourceDialog from "@/components/admin/AddResourceDialog";
import { useResourceStore } from "@/store/resources";
import type { Resource } from "@/lib/types/resource";
import type { Subject } from "@/lib/types/subject";


export default function DataManagementPage() {
  const { subjects, deleteSubject } = useSubjectStore();
  const [open, setOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const { resources, deleteResource } = useResourceStore();
  const [subjectSearch, setSubjectSearch] = useState("");
  const [subjectPaperFilters, setSubjectPaperFilters] = useState<string[]>([]);
const [resourceSearch, setResourceSearch] = useState("");
const [resourceSubjectFilter, setResourceSubjectFilter] = useState("all");
const [resourceCategoryFilter, setResourceCategoryFilter] = useState("all");
const [resourcePriorityFilter, setResourcePriorityFilter] = useState("all");

const [subjectFilter, setSubjectFilter] = useState<
  "all" | "active" | "inactive"
>("all");
function togglePaperFilter(paper: string) {
  setSubjectPaperFilters((prev) =>
    prev.includes(paper)
      ? prev.filter((p) => p !== paper)
      : [...prev, paper]
  );
}
const PAPERS = [
  "Prelims",
  "GS I",
  "GS II",
  "GS III",
  "GS IV",
  "Essay",
  "Optional",
  "Interview",
];

  const [editingSubject, setEditingSubject] =
  useState<Subject | null>(null);
  const [editingResource, setEditingResource] =
  useState<Resource | null>(null);
    return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <PageContainer>
          <PageTitle
            title="Data Management"
            subtitle="Manage UPSC subjects and resources."
          />

          <div className="mt-8 rounded-xl border bg-card">
     <div className="flex items-center justify-between border-b p-4">
  <h2 className="text-lg font-semibold">Subjects</h2>

  <div className="flex flex-wrap items-center gap-2">
    <input
      type="text"
      placeholder="Search subjects..."
      value={subjectSearch}
      onChange={(e) => setSubjectSearch(e.target.value)}
      className="rounded-lg border px-3 py-2"
    />

    <select
      value={subjectFilter}
      onChange={(e) =>
        setSubjectFilter(
          e.target.value as "all" | "active" | "inactive"
        )
      }
      className="rounded-lg border px-3 py-2"
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    <div className="flex flex-wrap gap-2">
      {PAPERS.map((paper) => (
        <button
          key={paper}
          type="button"
          onClick={() => togglePaperFilter(paper)}
          className={`rounded-full border px-3 py-1 text-sm ${
            subjectPaperFilters.includes(paper)
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          {paper}
        </button>
      ))}
    </div>

    <button
      onClick={() => {
        setEditingSubject(null);
        setOpen(true);
      }}
      className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
    >
      + Add Subject
    </button>
  </div>
</div>

            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">Papers</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {subjects
  .filter((subject) => {
    const matchesSearch = subject.name
      .toLowerCase()
      .includes(subjectSearch.toLowerCase());

    const matchesStatus =
      subjectFilter === "all"
        ? true
        : subjectFilter === "active"
        ? subject.active
        : !subject.active;

    const matchesPaper =
  subjectPaperFilters.length === 0
    ? true
    : subjectPaperFilters.some((paper) =>
        subject.papers.includes(paper)
      );

    return matchesSearch && matchesStatus && matchesPaper;
  })
  .map((subject) => (
                  <tr key={subject.id} className="border-b">
                    <td className="p-4">{subject.name}</td>

                    <td className="p-4">
                      {subject.papers.join(", ")}
                    </td>

                    <td className="p-4 space-x-2">
                      <button
  onClick={() => {
    setEditingSubject(subject);
    setOpen(true);
  }}
  className="rounded border px-3 py-1"
>
  Edit
</button>

                     <button
                      onClick={() => deleteSubject(subject.id)}
                      className="rounded border px-3 py-1 text-red-600"
                       >
                      Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
</div>

<div className="mt-8 rounded-xl border bg-card">
  <div className="flex items-center justify-between border-b p-4">
    <h2 className="text-lg font-semibold">Resources</h2>
<input
  type="text"
  placeholder="Search resources..."
  value={resourceSearch}
  onChange={(e) => setResourceSearch(e.target.value)}
  className="rounded-lg border px-3 py-2"
/>
<select
  value={resourceSubjectFilter}
  onChange={(e) => setResourceSubjectFilter(e.target.value)}
  className="rounded-lg border px-3 py-2"
>
  <option value="all">All Subjects</option>

  {subjects.map((subject) => (
    <option key={subject.id} value={subject.id}>
      {subject.name}
    </option>
  ))}
</select>
<select
  value={resourceCategoryFilter}
  onChange={(e) => setResourceCategoryFilter(e.target.value)}
  className="rounded-lg border px-3 py-2"
>
  <option value="all">All Categories</option>
  <option value="Book">Book</option>
  <option value="NCERT">NCERT</option>
  <option value="Notes">Notes</option>
  <option value="Video">Video</option>
  <option value="Website">Website</option>
  <option value="PYQ">PYQ</option>
  <option value="Test Series">Test Series</option>
  <option value="Current Affairs">Current Affairs</option>
  <option value="Other">Other</option>
</select>
<select
  value={resourcePriorityFilter}
  onChange={(e) => setResourcePriorityFilter(e.target.value)}
  className="rounded-lg border px-3 py-2"
>
  <option value="all">All Priorities</option>
  <option value="Essential">Essential</option>
  <option value="Recommended">Recommended</option>
  <option value="Reference">Reference</option>
</select>
    <button
      onClick={() => setResourceOpen(true)}
      className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
    >
      + Add Resource
    </button>
  </div>

  <table className="w-full">
    <thead>
      <tr className="border-b text-left">
        <th className="p-4">Name</th>
        <th className="p-4">Subject</th>
        <th className="p-4">Category</th>
        <th className="p-4">Priority</th>
        <th className="p-4">Actions</th>
      </tr>
    </thead>

    <tbody>
      {resources
  .filter((resource) => {
    const search = resourceSearch.toLowerCase();

    const matchesSearch =
      resource.name.toLowerCase().includes(search) ||
      subjects
        .find((s) => s.id === resource.subjectId)
        ?.name.toLowerCase()
        .includes(search);

    const matchesSubject =
      resourceSubjectFilter === "all"
        ? true
        : resource.subjectId === resourceSubjectFilter;

    const matchesCategory =
      resourceCategoryFilter === "all"
        ? true
        : resource.category === resourceCategoryFilter;

    const matchesPriority =
      resourcePriorityFilter === "all"
        ? true
        : resource.priority === resourcePriorityFilter;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesCategory &&
      matchesPriority
    );
  })
  .map((resource) => {
        const subject = subjects.find(
          (s) => s.id === resource.subjectId
        );

        return (
          <tr key={resource.id} className="border-b">
            <td className="p-4">{resource.name}</td>

            <td className="p-4">
              {subject?.name ?? "-"}
            </td>

            <td className="p-4">
              {resource.category}
            </td>

            <td className="p-4">
              {resource.priority}
            </td>

            <td className="p-4 space-x-2">
              <button
  onClick={() => {
    setEditingResource(resource);
    setResourceOpen(true);
  }}
  className="rounded border px-3 py-1"
>
  Edit
</button>

              <button
                onClick={() =>
                  deleteResource(resource.id)
                }
                className="rounded border px-3 py-1 text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
          
        </PageContainer>
       <AddSubjectDialog
  open={open}
  subject={editingSubject}
  onClose={() => {
    setEditingSubject(null);
    setOpen(false);
  }}
/>
<AddResourceDialog
  open={resourceOpen}
  resource={editingResource}
  onClose={() => {
    setEditingResource(null);
    setResourceOpen(false);
  }}
/>
      </main>
    </div>
  );
}