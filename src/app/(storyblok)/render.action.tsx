"use server";

import { StoryblokStory, ISbStoryData } from "@storyblok/react/rsc";

export async function render(story: ISbStoryData) {
  return <StoryblokStory story={story} />;
}
