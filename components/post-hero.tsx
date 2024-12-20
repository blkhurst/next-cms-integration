import { PostFieldsFragment } from "@/lib/graphql/__generated__/sdk";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function PostHero({ post }: { post: PostFieldsFragment }) {
  return (
    <section className="max-w-container mt-20">
      <div className="flex flex-col items-center gap-4 text-balance text-center">
        <p className="text-sm">{formatDate("en-GB", post.publishDate)}</p>
        <h1 className="text-5xl font-normal md:text-7xl">{post.title}</h1>
        <p className="text-lg">{post.description}</p>
      </div>

      {post.coverImage?.url && (
        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={post.coverImage?.url}
            fill
            style={{ objectFit: "cover" }}
            alt={""}
          />
        </div>
      )}
    </section>
  );
}
