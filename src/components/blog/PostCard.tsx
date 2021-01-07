import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { usePostUrl } from "../../lib/blog/hooks/post";
import Post from "../../lib/ghost/post";
import Card, { CardProps } from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle, SmallCardHeading } from "../text/headings";

export interface PostCardProps extends CardProps {
  post: Post
}

const PostCard: FunctionComponent<PostCardProps> = ({ post, ...cardProps }) => {
  const { language } = useLocale();
  const url = usePostUrl(post?.slug);

  return (
    <Card
      href={url}
      css={{
        minHeight: "10rem",
      }}
      {...cardProps}
    >
      <SmallCardHeading>{post?.publishedAt ? dayjs(post?.publishedAt).locale(language).format("HH:mm D MMMM YYYY") : <InlineSkeleton />}</SmallCardHeading>
      <CardTitle>{post?.title || <InlineSkeleton count={2} />}</CardTitle>
    </Card>
  );
};

export default PostCard;
