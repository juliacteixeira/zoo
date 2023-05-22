export function formatDate(date: any): string {
  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
}
