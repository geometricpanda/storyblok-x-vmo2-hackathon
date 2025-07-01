import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { STORYBLOK } from "./env";
import { Blok } from "./bloks";
import { PageBlok } from "./bloks/page.blok";
import { TeaserBlok } from "./bloks/teaser.blok";
import { GridBlok } from "./bloks/grid.blok";
import { FeatureBlok } from "./bloks/feature.blok";
import { VideoHeroBlok } from "./bloks/video-hero.blok";
import { SectionBlok } from "./bloks/section.blok";
import { CardBlok } from "./bloks/card.blok";
import { AccordionGroupBlok } from "./bloks/accordion-group.blok";
import { AccordionBlok } from "./bloks/accordion.blok";
import { TextBlok } from "./bloks/text.blok";
import { ImageBlok } from "./bloks/image.blok";

export const getStoryblokApi = storyblokInit({
  accessToken: STORYBLOK.ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    [Blok.Page]: PageBlok,
    [Blok.Teaser]: TeaserBlok,
    [Blok.Grid]: GridBlok,
    [Blok.Feature]: FeatureBlok,
    [Blok.VideoHero]: VideoHeroBlok,
    [Blok.Section]: SectionBlok,
    [Blok.Card]: CardBlok,
    [Blok.AccordionGroup]: AccordionGroupBlok,
    [Blok.Accordion]: AccordionBlok,
    [Blok.Text]: TextBlok,
    [Blok.Image]: ImageBlok,
  },
});

export const storyblok = getStoryblokApi();
