function triggerFileDownload(url: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}

export default triggerFileDownload;
