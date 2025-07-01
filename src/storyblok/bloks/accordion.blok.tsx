import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { Accordion } from "./_components/accordion";
import { Icon, IconData } from "@/components/icon";

type AccordionProps = ISbComponentType<Blok.Accordion> & {
  title: string;
  icon: IconData;
  body: Array<ISbComponentType<never>>;
};

export const AccordionBlok: BC<AccordionProps> = ({
  blok: { title, body, icon, ...blok },
}) => {
  const thisIcon = icon ? <Icon icon={icon} /> : undefined;

  return (
    <div {...storyblokEditable(blok)}>
      <Accordion title={title} icon={thisIcon}>
        {body.map((_blok) => (
          <StoryblokServerComponent blok={_blok} key={_blok._uid} />
        ))}
      </Accordion>
    </div>
  );
};
