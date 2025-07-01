import { storyblok } from "@/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const Page = async () => {
  const { data } = await storyblok.getStory("home", {
    version: "draft",
  });

  return <StoryblokStory story={data.story} />;
};

export default Page;
