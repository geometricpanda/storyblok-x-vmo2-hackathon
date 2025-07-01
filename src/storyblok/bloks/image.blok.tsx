import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

type ImageAsset = {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: "asset";
  meta_data: Record<string, unknown>;
  is_external_url: boolean;
};

type ImageProps = ISbComponentType<Blok.Image> & {
  image: ImageAsset;
  alt_text?: string;
  caption?: string;
};

// Helper function to extract dimensions from Storyblok URL
const extractDimensionsFromUrl = (
  url: string
): { width: number; height: number } => {
  const match = url.match(/\/(\d+)x(\d+)\//);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  // Fallback dimensions
  return { width: 800, height: 600 };
};

export const ImageBlok: BC<ImageProps> = ({ blok: { image, ...blok } }) => {
  if (!image?.filename) return null;

  const { width, height } = extractDimensionsFromUrl(image.filename);

  return (
    <div
      className="relative group overflow-hidden rounded-3xl"
      {...storyblokEditable(blok)}
    >
      <Image
        src={image.filename}
        alt={image.alt!}
        width={width}
        height={height}
        className="rounded-3xl max-w-full h-auto transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
