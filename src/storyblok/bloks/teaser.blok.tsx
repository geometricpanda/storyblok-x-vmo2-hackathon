import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type TeaserProps = ISbComponentType<Blok.Teaser> & {
  headline: string;
};

export const TeaserBlok: BC<TeaserProps> = ({
  blok: { headline, ...blok },
}) => (
  <div {...storyblokEditable(blok)}>
    <h2>{headline}</h2>
  </div>
);
