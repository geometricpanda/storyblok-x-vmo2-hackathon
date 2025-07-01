import { storyblok } from "@/storyblok";
import { render } from "../render.action";
import { Preview } from "../preview";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: Array<string>;
  }>;
  searchParams: Promise<{
    _storyblok_release?: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { _storyblok_release } = await props.searchParams;

  const slug = params.slug ? params.slug.join("/") : "home";

  const { data } = await storyblok.getStory(slug, {
    version: _storyblok_release ? "draft" : "published",
    ...(_storyblok_release && { from_release: _storyblok_release }),
  });

  if (!data) {
    return {};
  }

  const story = data.story;
  const title = `${story.name} | Storyblok x VMO2`;

  return {
    title,
  };
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
