import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(300),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    work: reference("work").optional(),
    ogImage: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z
    .object({
      name: z.string().max(80),
      tagline: z.string().max(160),
      kind: z.enum(["company", "project"]),
      type: z.enum(["case-study", "link-out"]),
      status: z.enum(["active", "maintained", "shipped", "acquired", "sunset"]),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      externalUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      accentColor: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .refine((data) => data.type !== "link-out" || !!data.externalUrl, {
      message: "type=link-out requires externalUrl",
      path: ["externalUrl"],
    }),
});

export const collections = { posts, work };
