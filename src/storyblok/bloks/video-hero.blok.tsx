import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type VideoAsset = {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: "asset";
  meta_data: Record<string, unknown>;
  is_external_url: boolean;
};

type VideoHeroProps = ISbComponentType<Blok.VideoHero> & {
  title: string;
  mobile_video: VideoAsset;
  desktop_video: VideoAsset;
};

export const VideoHeroBlok: BC<VideoHeroProps> = ({
  blok: { title, mobile_video, desktop_video, ...blok },
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Desktop Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        style={{ aspectRatio: "16/9" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={desktop_video?.filename} type="video/mp4" />
      </video>

      {/* Mobile Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        style={{ aspectRatio: "9/16" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={mobile_video?.filename} type="video/mp4" />
      </video>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 max-w-4xl">
          <h1
            className="text-6xl md:text-8xl text-white leading-tight font-bitcount"
            {...storyblokEditable(blok)}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};
