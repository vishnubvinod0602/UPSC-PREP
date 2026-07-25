export function normalizeText(text: string): string {
  return text
    .replace(/\n/g, " ")
    .replace(/\|/g, " ")
    .replace(/_/g, " ")
    .replace(/[^\w\s:/&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}