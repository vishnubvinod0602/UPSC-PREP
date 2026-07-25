export async function createPendingImport(chatId: string): Promise<string>;

export async function savePendingSchedule(
  importId: string,
  schedule: ScheduleEntry[]
): Promise<void>;

export async function getPendingImport(
  chatId: string
): Promise<ScheduleEntry[] | null>;

export async function confirmPendingImport(
  chatId: string
): Promise<void>;

export async function cancelPendingImport(
  chatId: string
): Promise<void>;