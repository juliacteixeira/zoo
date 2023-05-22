export function formatDate(date: Date): string {
  const data = new Date(date);
  const day = data.getDay().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear().toString();

  console.log(`${day}/${month}/${year}`);

  return `${day}/${month}/${year}`;
}
