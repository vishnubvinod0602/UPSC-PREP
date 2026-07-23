"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";

import { UPSC_SUBJECTS } from "@/lib/constants/subjects";

export default function PlannerPage() {
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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UPSC_SUBJECTS.map((subject) => (
              <div
                key={subject.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
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
        </PageContainer>
      </main>
    </div>
  );
}