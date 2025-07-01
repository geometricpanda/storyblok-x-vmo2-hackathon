import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

type PageProps = ISbComponentType<Blok.Page> & {
  body: Array<ISbComponentType<Blok>>;
  title?: string;
  description?: string;
};

export const PageBlok: BC<PageProps> = ({ blok: { body, ...blok } }) => (
  <div {...storyblokEditable(blok)}>
    {/* Title and description fields are available for metadata but not rendered in the component */}
    {body.map((_blok) => (
      <StoryblokServerComponent blok={_blok} key={_blok._uid} />
    ))}
  </div>
);
