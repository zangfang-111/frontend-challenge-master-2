import { type ImageLoaderProps } from "next/image";

function scopeImageLoader(props: ImageLoaderProps | undefined): string {
  return props?.src || '';
}

export default scopeImageLoader