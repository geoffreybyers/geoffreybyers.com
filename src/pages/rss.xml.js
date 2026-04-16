import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../lib/constants.ts";

export async function GET(context) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}`,
      content: post.body,
    })),
    customData: `<language>en-us</language>`,
  });
}
