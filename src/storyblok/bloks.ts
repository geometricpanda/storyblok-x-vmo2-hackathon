import { FC } from "react";
import { ISbComponentType } from "storyblok-js-client";

export enum Blok {
  Page = "page",
  Teaser = "teaser",
  Grid = "grid",
  Feature = "feature",
  Hero = "hero",
}

export type BC<T extends ISbComponentType<Blok>> = FC<{ blok: T }>;
