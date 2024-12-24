"use client"
import { PostContentFieldsFragment } from "@/lib/graphql/__generated__/sdk";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface PostContentProps {
  postContent: PostContentFieldsFragment | undefined | null;
}

export default function PostContent({ postContent }: PostContentProps) {
  const livePostContent = useContentfulLiveUpdates(postContent);

  return (
    <section className="mt-20 md:mt-24">
      <article className="prose">
        {documentToReactComponents(livePostContent?.content?.json)}
      </article>
    </section>
  );
}
