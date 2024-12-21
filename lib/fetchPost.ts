import { draftMode } from "next/headers";
import { client, previewClient } from "./graphqlClient";
import { PostFieldsFragment, PostOrder } from "./graphql/__generated__/sdk";

export type ClientMode = "preview" | "delivery" | "auto";

export async function getClient(mode: ClientMode) {
  if (mode === "preview") return { preview: true, gqlClient: previewClient };
  if (mode === "delivery") return { preview: false, gqlClient: client };

  const { isEnabled: preview } = await draftMode();
  if (mode === "auto")
    return { preview: preview, gqlClient: preview ? previewClient : client };

  throw new Error(`Invalid client mode: ${mode}`);
}

/**
 * @param mode Choose between `preview`, `delivery` or `auto`.
 * Calling `draftMode` from `generateStaticParams` throws an error.
 */
export async function fetchPosts(
  mode: ClientMode = "auto",
): Promise<PostFieldsFragment[]> {
  console.log("Fetching all posts...");
  const { preview, gqlClient } = await getClient(mode);

  const { postCollection } = await gqlClient.PostCollection({
    preview: preview,
    order: PostOrder.PublishDateDesc,
  });

  if (!postCollection?.items) {
    console.warn("No posts found in PostCollection");
    return [];
  }

  const posts = postCollection.items.filter((post) => post !== null);
  return posts;
}

/**
 * Fetch a single post and its content by slug.
 * @param slug The slug of the post to fetch.
 * @param mode Choose between `preview`, `delivery`, or `auto`.
 */
export async function fetchPost(slug: string, mode: ClientMode = "auto") {
  console.log(`Fetching [${slug}]...`);
  const { preview, gqlClient } = await getClient(mode);

  const post = await gqlClient.PostCollection({
    preview: preview,
    where: { slug: slug },
    limit: 1,
  });
  
  const postContent = await gqlClient.PostContent({
    slug: slug,
    preview: preview,
  });

  return {
    post: post.postCollection?.items[0],
    postContent: postContent.postCollection?.items[0],
  };
}
