export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatYearRange(startDate: string, endDate?: string) {
  const start = new Date(startDate).getFullYear();
  const end = endDate ? new Date(endDate).getFullYear() : "Present";

  return `${start} - ${end}`;
}
