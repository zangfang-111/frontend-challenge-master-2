function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function formatBogNumberWithNoSpace(num: number): string | number | undefined {
  if (!num) return undefined;

  const number = Math.abs(num)
  if (number > 999 && number < 1000000) {
    return `${roundToOneDecimal((number / 1000))}K`;
  }
  if (number > 1000000) {
    return `${roundToOneDecimal(number / 1000000)}M`;
  }
  if (number < 900) {
    return number;
  }
  return number;
}

export default formatBogNumberWithNoSpace;
