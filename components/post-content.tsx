import { PostContentFieldsFragment } from "@/lib/graphql/__generated__/sdk";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface PostContentProps {
  postContent: PostContentFieldsFragment | undefined | null;
}

export default function PostContent({ postContent }: PostContentProps) {
  return (
    <section className="mt-20 md:mt-24">
      <article className="prose">
        {documentToReactComponents(postContent?.content?.json)}
      </article>
    </section>
  );
}
