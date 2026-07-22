import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-muted p-3">
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}