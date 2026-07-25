import type { TableBounds } from "../opencv/detectTable";

export interface RowBox {
  top: number;
  height: number;
}

export async function findRows(
  file: File,
  table: TableBounds
): Promise<RowBox[]> {
  const rows: RowBox[] = [];

  // Temporary values.
  // Later these will be detected automatically with OpenCV.
  const headerHeight = 52;
  const rowHeight = 55;

  const usableHeight = table.height - headerHeight;

  const count = Math.floor(usableHeight / rowHeight);

  for (let i = 0; i < count; i++) {
    rows.push({
      top: table.top + headerHeight + i * rowHeight,
      height: rowHeight,
    });
  }

  return rows;
}