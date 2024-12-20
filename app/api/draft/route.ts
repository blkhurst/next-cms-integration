import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies, draftMode } from "next/headers";
import { fetchPost } from "@/lib/fetchPost";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Validate secret and slug
  if (secret !== process.env.DRAFT_MODE_SECRET || !slug) {
    return new Response("Invalid token or slug.", { status: 401 });
  }

  // Fetch the post
  const { post } = await fetchPost(slug);
  if (!post?.slug) {
    return new Response("Post does not exist.", { status: 400 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Adjust Draft Mode cookie for Contentful compatibility. sameSite none, secure false
  // https://www.contentful.com/developers/docs/tutorials/preview/live-preview/
  const cookieStore = await cookies();
  const draftCookie = cookieStore.get("__prerender_bypass");
  if (draftCookie) {
    cookieStore.set({
      ...draftCookie,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }

  // Redirect to fetched post's slug to prevent open redirect vulnerabilities
  redirect(`/posts/${post.slug}`);
}
