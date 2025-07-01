import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

type AccordionGroupProps = ISbComponentType<Blok.AccordionGroup> & {
  children: Array<ISbComponentType<never>>;
};

export const AccordionGroupBlok: BC<AccordionGroupProps> = ({
  blok: { children, ...blok },
}) => (
  <div {...storyblokEditable(blok)} className="accordion-group space-y-2">
    {children.map((_blok) => (
      <StoryblokServerComponent blok={_blok} key={_blok._uid} />
    ))}
  </div>
);
