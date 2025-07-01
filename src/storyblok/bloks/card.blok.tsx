import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

import { richTextResolver, StoryblokRichTextNode } from "@storyblok/richtext";
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

type CardProps = ISbComponentType<Blok.Card> & {
  title: string;
  body: StoryblokRichTextNode;
  image: ImageAsset;
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
  return { width: 400, height: 300 };
};

export const CardBlok: BC<CardProps> = ({
  blok: { title, body, image, ...blok },
}) => {
  const { width, height } = extractDimensionsFromUrl(image?.filename || "");

  const { render } = richTextResolver();
  const html = render(body);

  return (
    <div {...storyblokEditable(blok)} className="card bg-base-100 shadow-sm">
      {image?.filename && (
        <div className="relative group overflow-hidden rounded-3xl">
          <Image
            src={image.filename}
            alt={image.alt!}
            width={width}
            height={height}
            className="rounded-3xl max-w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="card-body items-center text-center">
        {title && <h2 className="card-title">{title}</h2>}
        {body && (
          <div
            className="prose prose-sm text-sm [&_p:not(:last-child)]:mb-3"
            dangerouslySetInnerHTML={{ __html: html as string }}
          />
        )}
      </div>
    </div>
  );
};
