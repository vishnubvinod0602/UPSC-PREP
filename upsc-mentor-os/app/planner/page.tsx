"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import type { Subject } from "@/lib/types/subject";
import { useState } from "react";
import { DEFAULT_SUBJECTS } from "@/lib/constants/subjects";

export default function PlannerPage() {
  const [selectedSubject, setSelectedSubject] =
  useState<Subject | null>(null);
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
      {DEFAULT_SUBJECTS.map((subject) => (
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

        <p className="mt-8 text-muted-foreground">
          Planner panel coming next...
        </p>
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