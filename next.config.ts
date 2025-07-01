import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://a.storyblok.com/f/285488074918583/**")],
  },
};

export default nextConfig;
