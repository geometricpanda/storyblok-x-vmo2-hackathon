import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import Image from "next/image";

import { richTextResolver, StoryblokRichTextNode } from "@storyblok/richtext";

type CardProps = ISbComponentType<Blok.Card> & {
  title: string;
  body: StoryblokRichTextNode;
  image: Array<ISbComponentType<never>>;
};

// Help

export const CardBlok: BC<CardProps> = ({
  blok: { title, body, image, ...blok },
}) => {
  const { render } = richTextResolver();
  const html = render(body);

  return (
    <div {...storyblokEditable(blok)} className="card bg-base-100 shadow-sm">
      {image.map((_blok) => (
        <StoryblokServerComponent blok={_blok} key={_blok._uid} />
      ))}

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
