 function formatNumberToPercent (engagement: number): string {
  return (engagement * 100).toFixed(2)
}

export default formatNumberToPercent