import { storyblok } from "@/storyblok";
import { render } from "./render.action";
import { Preview } from "./preview";

const Page = async () => {
  const { data } = await storyblok.getStory("home", {
    version: "draft",
  });

  const story = await render(data.story);

  return <Preview storyId={data.story.id}>{story}</Preview>;
};

export default Page;
