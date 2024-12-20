import Link from "next/link";
import { PostFieldsFragment } from "@/lib/graphql/__generated__/sdk";
import { formatDate } from "@/lib/utils";
import { draftMode } from "next/headers";

export default async function PostItem({ post }: { post: PostFieldsFragment }) {
  const { isEnabled: preview } = await draftMode();
  const isDraft = preview && !post.sys.publishedAt;

  return (
    <div className="block md:flex md:items-end md:gap-2">
      <div className="decoration-transparent duration-200 md:underline md:hover:decoration-copy-primary">
        <Link href={`/posts/${post.slug}`}>
          <span className={isDraft ? "text-orange-400" : "hidden"}>• </span>
          {post.title}
        </Link>
      </div>
      <div className="mb-1 hidden h-full flex-1 border-b border-copy-tertiary/10 md:block" />
      <p className="text-copy-tertiary">
        {formatDate("en-US", post.publishDate)}
      </p>
    </div>
  );
}
