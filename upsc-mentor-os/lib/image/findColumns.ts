export interface Column {
  x: number;
  width: number;
}

export function findColumns(table: {
  left: number;
  width: number;
}): Column[] {
  const ratios = [
    0.12, // Date
    0.18, // Time
    0.32, // Subject
    0.20, // Faculty
    0.10, // Mode
    0.08, // Venue
  ];

  const columns: Column[] = [];

  let currentX = table.left;

  for (const ratio of ratios) {
    const width = Math.round(table.width * ratio);

    columns.push({
      x: currentX,
      width,
    });

    currentX += width;
  }

  return columns;
}