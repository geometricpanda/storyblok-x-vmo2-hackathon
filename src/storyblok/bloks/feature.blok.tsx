import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type FeatureProps = ISbComponentType<Blok.Feature> & {
  name: string;
};

export const FeatureBlok: BC<FeatureProps> = ({ blok: { name, ...blok } }) => (
  <div {...storyblokEditable(blok)}>
    <h3>{name}</h3>
  </div>
);
