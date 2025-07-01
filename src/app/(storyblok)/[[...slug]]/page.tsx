import { storyblok } from "@/storyblok";
import { render } from "../render.action";
import { Preview } from "../preview";

interface PageProps {
  params: Promise<{
    slug: Array<string>;
  }>;
  searchParams: Promise<{
    _storyblok_release?: string;
  }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const { _storyblok_release } = await props.searchParams;

  const slug = params.slug ? params.slug.join("/") : "home";

  if (_storyblok_release) {
    const { data } = await storyblok.getStory(slug, {
      version: "draft",
      from_release: _storyblok_release,
    });

    return <Preview storyId={data.story.id}>{render(data.story)}</Preview>;
  }

  const { data } = await storyblok.getStory(slug);
  return await render(data.story);
};

export default Page;
