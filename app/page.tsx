import PostItem from "@/components/post-item";
import { fetchPosts } from "@/lib/fetchPost";

export default async function Page() {
  const posts = await fetchPosts();

  return (
    <main className="max-w-container py-4">
      <h1 className="mt-8 text-3xl font-semibold">Content</h1>
      <ul className="mt-4 grid grid-cols-1 gap-3">
        {posts.map((post) => {
          return <PostItem key={post.sys.id} post={post} />;
        })}
      </ul>
    </main>
  );
}
