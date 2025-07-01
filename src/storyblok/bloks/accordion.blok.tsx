import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver, StoryblokRichTextNode } from "@storyblok/richtext";
import { Accordion } from "./_components/accordion";
import { Icon, IconData } from "@/components/icon";

type AccordionProps = ISbComponentType<Blok.Accordion> & {
  title: string;
  icon: IconData;
  body: StoryblokRichTextNode;
};

export const AccordionBlok: BC<AccordionProps> = ({
  blok: { title, body, icon, ...blok },
}) => {
  const { render } = richTextResolver();
  const html = render(body);

  const thisIcon = icon ? <Icon icon={icon} /> : undefined;

  return (
    <div {...storyblokEditable(blok)}>
      <Accordion title={title} icon={thisIcon}>
        {body && (
          <div
            className="prose prose-sm text-sm [&_p:not(:last-child)]:mb-3"
            dangerouslySetInnerHTML={{ __html: html as string }}
          />
        )}
      </Accordion>
    </div>
  );
};
