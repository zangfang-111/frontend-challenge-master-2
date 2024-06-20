function formatBigNumberPipeline(num: number): string | number | undefined {
  if (!num) return undefined;
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(0)}k`;
  }
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num < 900) {
    return num;
  }
  return num;
}

export default formatBigNumberPipeline;
