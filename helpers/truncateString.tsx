function truncateString(str: string, num: number): string {
  return str?.length > num ? `${str.slice(0, num > 3 ? num - 3 : num)}...` : str;
}

export default truncateString;
