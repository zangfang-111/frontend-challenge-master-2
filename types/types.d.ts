declare module '*.svg' {
  const content: any;
  export default content;
}

interface Window {
  drift?: any;
  getRecipientsMixmax?: (callback: any) => void;
  dataToMixmax?: any;
}
