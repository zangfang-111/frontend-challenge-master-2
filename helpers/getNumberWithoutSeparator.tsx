function getNumberWithoutSeparator(cost: number | undefined): string | undefined {
  if (!cost) return undefined;
  return cost.toString().replace(/\./g, '');
}

export default getNumberWithoutSeparator;
