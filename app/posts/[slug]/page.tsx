import { notFound } from "next/navigation";
import { fetchPosts, fetchPost } from "@/lib/fetchPost";
import PostHero from "@/components/post-hero";

export async function generateStaticParams() {
  const posts = await fetchPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const { post, content } = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <PostHero post={post} />
    </main>
  );
}
