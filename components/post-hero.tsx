"use client";
import { PostFieldsFragment } from "@/lib/graphql/__generated__/sdk";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

export default function PostHero({ post }: { post: PostFieldsFragment }) {
  const livePost = useContentfulLiveUpdates(post);

  return (
    <section className="max-w-container mt-20">
      <div className="flex flex-col items-center gap-4 text-balance text-center">
        <p className="text-sm">{formatDate("en-GB", livePost.publishDate)}</p>
        <h1 className="text-5xl font-normal md:text-7xl">{livePost.title}</h1>
        <p className="text-lg">{livePost.description}</p>
      </div>

      {livePost.coverImage?.url && (
        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={livePost.coverImage?.url}
            fill
            style={{ objectFit: "cover" }}
            priority
            alt={""}
          />
        </div>
      )}
    </section>
  );
}
