import { draftMode } from "next/headers";
import { client, previewClient } from "./graphqlClient";
import { PostFieldsFragment, PostOrder } from "./graphql/__generated__/sdk";

export async function getClient(skipDraft?: boolean) {
  if (skipDraft) return { preview: false, gqlClient: client };

  const { isEnabled: preview } = await draftMode();
  return {
    preview: preview,
    gqlClient: preview ? previewClient : client,
  };
}

/**
 * @param skipDraft Provide the option to skip calling draftMode
 * as calling from `generateStaticParams` throws an error.
 */
export async function fetchPosts(
  skipDraft?: boolean,
): Promise<PostFieldsFragment[]> {
  console.log("Fetching all posts...");
  const { preview, gqlClient } = await getClient(skipDraft);
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

export async function fetchPost(slug: string) {
  console.log(`Fetching [${slug}]...`);
  const { preview, gqlClient } = await getClient();

  const post = await gqlClient.Post({ slug: slug, preview: preview });
  const postContent = await gqlClient.PostContent({
    slug: slug,
    preview: preview,
  });

  return {
    post: post.postCollection?.items[0],
    postContent: postContent.postCollection?.items[0],
  };
}
