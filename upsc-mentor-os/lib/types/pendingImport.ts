export interface PendingImport {
  id: string;
  chatId: string;
  schedule: string;
  createdAt: string;
  status: "pending" | "imported" | "cancelled";
}