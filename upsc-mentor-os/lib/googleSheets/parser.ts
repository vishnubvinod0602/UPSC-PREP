export function parseBoolean(value: any) {
  return value === true || value === "TRUE";
}

export function parseNumber(value: any) {
  return Number(value);
}