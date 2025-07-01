import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { STORYBLOK } from "./env";
import { Blok } from "./bloks";
import { PageBlok } from "./bloks/page.blok";
import { TeaserBlok } from "./bloks/teaser.blok";
import { GridBlok } from "./bloks/grid.blok";
import { FeatureBlok } from "./bloks/feature.blok";
import { HeroBlok } from "./bloks/hero.blok";

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
    [Blok.Hero]: HeroBlok,
  },
});

export const storyblok = getStoryblokApi();
