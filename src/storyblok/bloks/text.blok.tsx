import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver, StoryblokRichTextNode } from "@storyblok/richtext";

type TextProps = ISbComponentType<Blok.Text> & {
  text: StoryblokRichTextNode;
};

export const TextBlok: BC<TextProps> = ({ blok: { text, ...blok } }) => {
  const { render } = richTextResolver();
  const html = render(text);

  return (
    <div {...storyblokEditable(blok)}>
      {text && (
        <div
          className="prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: html as string }}
        />
      )}
    </div>
  );
};
