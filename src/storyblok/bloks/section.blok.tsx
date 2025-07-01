import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { clsx } from "clsx";

type PaddingSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type SectionProps = ISbComponentType<Blok.Section> & {
  children: Array<ISbComponentType<Blok>>;
  padding_top?: PaddingSize;
  padding_bottom?: PaddingSize;
};

export const SectionBlok: BC<SectionProps> = ({
  blok: { children, padding_top, padding_bottom, ...blok },
}) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className={clsx(
        "max-w-7xl mx-auto",
        "px-4",
        // Padding top classes
        {
          "pt-4": padding_top === "sm",
          "pt-8": padding_top === "md",
          "pt-16": padding_top === "lg",
          "pt-24": padding_top === "xl",
          "pt-32": padding_top === "2xl",
          "pt-40": padding_top === "3xl",
        },
        // Padding bottom classes
        {
          "pb-4": padding_bottom === "sm",
          "pb-8": padding_bottom === "md",
          "pb-16": padding_bottom === "lg",
          "pb-24": padding_bottom === "xl",
          "pb-32": padding_bottom === "2xl",
          "pb-40": padding_bottom === "3xl",
        }
      )}
    >
      {children?.map((_blok) => (
        <StoryblokServerComponent blok={_blok} key={_blok._uid} />
      ))}
    </section>
  );
};
