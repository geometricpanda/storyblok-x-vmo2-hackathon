"use client";

import { storyblokInit, useStoryblokBridge } from "@storyblok/react/rsc";
import { FC, ReactNode, useState } from "react";
import { render } from "./render.action";

storyblokInit({
  accessToken: "",
  bridge: true,
});

interface PreviewProps {
  storyId: number;
  children: ReactNode;
}

export const Preview: FC<PreviewProps> = ({ storyId, children }) => {
  const [renderedStory, setRenderedStory] = useState<ReactNode>(children);

  useStoryblokBridge(storyId, async (data) => {
    const newRender = await render(data);
    setRenderedStory(newRender);
  });

  return renderedStory;
};
