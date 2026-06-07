export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatYearRange(startDate: string, endDate?: string) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const start = fmt(new Date(startDate));
  const end = endDate ? fmt(new Date(endDate)) : "Present";

  return `${start} - ${end}`;
}

type DateSpan = { start_date: string; end_date?: string };

/**
 * Total years covered by a set of date spans, merging overlapping intervals so
 * concurrent roles (e.g. an internship that overlaps a full-time role) aren't
 * counted twice. A blank `end_date` is treated as ongoing (up to `now`).
 */
export function totalYears(spans: DateSpan[], now: Date = new Date()): number {
  const intervals = spans
    .map((s) => {
      const start = new Date(s.start_date).getTime();
      const end = s.end_date ? new Date(s.end_date).getTime() : now.getTime();
      return [start, end] as const;
    })
    .filter(
      ([start, end]) =>
        Number.isFinite(start) && Number.isFinite(end) && end > start,
    )
    .sort((a, b) => a[0] - b[0]);

  let totalMs = 0;
  let curStart = -1;
  let curEnd = -1;
  for (const [start, end] of intervals) {
    if (start > curEnd) {
      if (curEnd >= 0) totalMs += curEnd - curStart;
      curStart = start;
      curEnd = end;
    } else if (end > curEnd) {
      curEnd = end;
    }
  }
  if (curEnd >= 0) totalMs += curEnd - curStart;

  return totalMs / (1000 * 60 * 60 * 24 * 365.25);
}

/** Compact label for a year total, e.g. `3+ yrs`, `1 yr`, `<1 yr`. */
export function formatYearsCount(years: number): string {
  const whole = Math.floor(years);
  if (whole < 1) return "<1 yr";
  const hasExtra = years - whole >= 0.08; // ~1 month past the whole year
  return `${whole}${hasExtra ? "+" : ""} ${whole === 1 ? "yr" : "yrs"}`;
}
