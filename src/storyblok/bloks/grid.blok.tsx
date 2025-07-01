import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

type GridProps = ISbComponentType<Blok.Grid> & {
  columns: Array<ISbComponentType<never>>;
};

export const GridBlok: BC<GridProps> = ({ blok: { columns, ...blok } }) => (
  <div
    {...storyblokEditable(blok)}
    className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
  >
    {columns.map((_blok) => (
      <StoryblokServerComponent blok={_blok} key={_blok._uid} />
    ))}
  </div>
);
