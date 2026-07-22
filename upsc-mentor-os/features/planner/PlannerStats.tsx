"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePlannerStore } from "@/store/planner";

export function PlannerStats() {
  const { tasks } = usePlannerStore();

  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  const pending = total - completed;

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Completed</p>
          <h2 className="text-3xl font-bold text-green-500">
            {completed}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Pending</p>
          <h2 className="text-3xl font-bold text-orange-500">
            {pending}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}