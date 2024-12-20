export function formatDate(locale: Intl.LocalesArgument, date: string): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
