/** "APR 14, 2026" — consistent across the site. */
export function formatDate(d: Date): string {
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

/** "APR 14" — compact variant for row meta. */
export function formatDateShort(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}

/** "2022—24" or "2025—" (ongoing) — for work entry date ranges. */
export function formatDateRange(start: Date, end?: Date): string {
  const startYear = start.getFullYear();
  if (!end) return `${startYear}—`;
  const endYear = end.getFullYear();
  if (startYear === endYear) return String(startYear);
  return `${startYear}—${String(endYear).slice(2)}`;
}
