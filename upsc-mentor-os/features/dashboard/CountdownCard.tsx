import { CalendarDays } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CountdownCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          UPSC Countdown
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="font-medium">Prelims 2026</p>
            <p className="text-sm text-muted-foreground">
              Days Remaining
            </p>
          </div>

          <span className="text-3xl font-bold text-indigo-600">
            310
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="font-medium">Mains 2026</p>
            <p className="text-sm text-muted-foreground">
              Days Remaining
            </p>
          </div>

          <span className="text-3xl font-bold text-emerald-600">
            415
          </span>
        </div>
      </CardContent>
    </Card>
  );
}