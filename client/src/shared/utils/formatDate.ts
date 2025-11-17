export function formatDate(isoString: Date) {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
