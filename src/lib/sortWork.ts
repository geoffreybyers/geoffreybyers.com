import type { CollectionEntry } from "astro:content";

type WorkEntry = CollectionEntry<"work">;

/** Lower rank = higher in the list. */
const STATUS_RANK: Record<WorkEntry["data"]["status"], number> = {
  active: 0,
  maintained: 1,
  shipped: 2,
  acquired: 2,
  sunset: 3,
};

/** Status-first, then startDate descending. */
export function sortWork(entries: WorkEntry[]): WorkEntry[] {
  return [...entries].sort((a, b) => {
    const rankDiff = STATUS_RANK[a.data.status] - STATUS_RANK[b.data.status];
    if (rankDiff !== 0) return rankDiff;
    return b.data.startDate.getTime() - a.data.startDate.getTime();
  });
}
