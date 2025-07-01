import { FC } from "react";
import { ISbComponentType } from "storyblok-js-client";

export enum Blok {
  Page = "page",
  Teaser = "teaser",
  Grid = "grid",
  Feature = "feature",
  VideoHero = "video_hero",
  Section = "section",
  Card = "card",
  AccordionGroup = "accordion_group",
  Accordion = "accordion",
  Text = "text",
  Image = "image",
}

export type BC<T extends ISbComponentType<Blok>> = FC<{ blok: T }>;
