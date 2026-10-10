export function formatToman(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return "۰ تومان";
  return `${new Intl.NumberFormat("fa-IR").format(n)} تومان`;
}

export function toFaDigits(value: number | string): string {
  return new Intl.NumberFormat("fa-IR").format(Number(value));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
