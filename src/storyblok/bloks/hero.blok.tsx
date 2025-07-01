import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type HeroProps = ISbComponentType<Blok.Hero> & {
  title: string;
};

export const HeroBlok: BC<HeroProps> = ({ blok: { title, ...blok } }) => (
  <section {...storyblokEditable(blok)}>
    <h1>{title}</h1>
  </section>
);
