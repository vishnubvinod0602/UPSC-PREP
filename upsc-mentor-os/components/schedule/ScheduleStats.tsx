import { ScheduleEntry } from "@/lib/ai/types";

interface Props {
  schedule: ScheduleEntry[];
}

export default function ScheduleStats({
  schedule,
}: Props) {

  const subjects = new Set(
    schedule.map((x) => x.subject)
  ).size;

  const faculties = new Set(
    schedule.map((x) => x.faculty)
  ).size;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="border rounded p-4">
        <h3>Total Classes</h3>
        <p className="text-3xl font-bold">
          {schedule.length}
        </p>
      </div>

      <div className="border rounded p-4">
        <h3>Subjects</h3>
        <p className="text-3xl font-bold">
          {subjects}
        </p>
      </div>

      <div className="border rounded p-4">
        <h3>Faculty</h3>
        <p className="text-3xl font-bold">
          {faculties}
        </p>
      </div>

    </div>
  );
}