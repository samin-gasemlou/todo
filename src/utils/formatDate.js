export function formatDate(dateString, type = 'date') {
  if (!dateString) return '';

  const date = new Date(dateString);

  switch (type) {
    case 'date':
      return date.toLocaleDateString('fa-IR');
    case 'time':
      return date.toLocaleTimeString('fa-IR');
    case 'datetime':
      return date.toLocaleString('fa-IR');
    default:
      return date.toLocaleDateString('fa-IR');
  }
}
