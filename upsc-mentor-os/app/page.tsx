"use client";

import { Clock3, BookOpen, Target, Trophy } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import { PageContainer } from "@/components/common/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import { StatCard } from "@/components/common/StatCard";

import { useDashboardStore } from "@/store/dashboard";

import { TodayPlanner } from "@/features/dashboard/TodayPlanner";

import { CountdownCard } from "@/features/dashboard/CountdownCard";


export default function HomePage() {
  const {
    studyHours,
    revisionDue,
    readinessScore,
    mockScore,
  } = useDashboardStore();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <PageContainer>
          <PageTitle
            title="Dashboard"
            subtitle="Welcome back! Here's your UPSC preparation overview."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Study Hours"
              value={`${studyHours}h`}
              icon={Clock3}
              description="Today's progress"
            />

            <StatCard
              title="Revision Due"
              value={revisionDue.toString()}
              icon={BookOpen}
              description="Topics to revise"
            />

            <StatCard
              title="Readiness"
              value={`${readinessScore}%`}
              icon={Target}
              description="AI estimate"
            />

            <StatCard
              title="Mock Score"
              value={mockScore.toString()}
              icon={Trophy}
              description="Latest test"
            />
            
          </div>
        
 
<div className="mt-8 grid gap-6 lg:grid-cols-2">
  <TodayPlanner />
  <CountdownCard />
</div>

        </PageContainer>
      </main>
    </div>
  );
}