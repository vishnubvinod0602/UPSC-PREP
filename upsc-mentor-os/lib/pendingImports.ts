import {
  addRow,
  fetchSheet,
  updateRow,
  
} from "@/lib/googleSheets/client";

import type { PendingImport } from "@/lib/types/pendingImport";

export async function savePendingImport(
  chatId: string,
  schedule: unknown[]
) {
  await addRow("PendingImports", {
    id: crypto.randomUUID(),
    chatId,
    schedule: JSON.stringify(schedule),
    createdAt: new Date().toISOString(),
    status: "pending",
  });
}

export async function getLatestPendingImport(
  chatId: string
) {
  const imports =
    await fetchSheet<PendingImport>(
      "PendingImports",
      {
        chatId,
        status: "pending",
      }
    );

  return imports[0] ?? null;
}

export async function markImported(
  id: string
) {
  await updateRow(
    "PendingImports",
    id,
    {
      status: "imported",
    }
  );
}

export async function markCancelled(
  id: string
) {
  await updateRow(
    "PendingImports",
    id,
    {
      status: "cancelled",
    }
  );
}