import Image, { type ImageProps } from "next/image";
import blurMap from "@/data/image-blur.json";

const blurs = blurMap as Record<string, string>;

// next/image with the generated blur placeholder when one exists for this path.
export function Photo({ src, alt, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  const blur = blurs[src];
  return <Image src={src} alt={alt} placeholder={blur ? "blur" : "empty"} blurDataURL={blur} {...rest} />;
}
