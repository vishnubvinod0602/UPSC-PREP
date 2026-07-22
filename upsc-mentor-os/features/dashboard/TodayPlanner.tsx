import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tasks = [
  {
    time: "07:00",
    title: "GS Paper II",
    duration: "2h",
  },
  {
    time: "10:00",
    title: "PSIR Revision",
    duration: "1h",
  },
  {
    time: "14:00",
    title: "MCQ Practice",
    duration: "90m",
  },
];

export function TodayPlanner() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Today's Planner</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div
            key={`${task.time}-${task.title}`}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                {task.time}
              </p>
            </div>

            <span className="text-sm font-medium text-muted-foreground">
              {task.duration}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}