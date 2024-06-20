function getNumberWithSpaces(x: number | undefined): string {
  if (!x) return '';
  const separator = ' ';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export default getNumberWithSpaces;
