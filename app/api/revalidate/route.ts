import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const headerList = await headers();
  const secret = headerList.get("secret");

  // Validate secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response(
      JSON.stringify({ revalidated: false, message: "Invalid secret" }),
      { status: 401 },
    );
  }

  try {
    const { slug } = await request.json();

    // Validate slug
    if (!slug) {
      return new Response(
        JSON.stringify({ revalidated: false, message: "Missing slug" }),
        { status: 400 },
      );
    }

    // Revalidate paths
    revalidatePath("/");
    revalidatePath(`/posts/${slug}`);
    // Optionally, revalidate all paths
    // revalidatePath("/", "layout");

    return new Response(JSON.stringify({ revalidated: true, path: slug }));
  } catch {
    return new Response(
      JSON.stringify({ revalidated: false, message: "Invalid request body" }),
      { status: 400 },
    );
  }
}
