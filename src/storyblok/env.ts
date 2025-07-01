import z from "zod";

const storyblokSchema = z.object({
  STORYBLOK_ACCESS_TOKEN: z.string(),
});

const { STORYBLOK_ACCESS_TOKEN } = storyblokSchema.parse(process.env);

export const STORYBLOK = {
  ACCESS_TOKEN: STORYBLOK_ACCESS_TOKEN,
};
