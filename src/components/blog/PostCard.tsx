import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { usePostUrl } from "../../lib/blog/hooks/post";
import Post from "../../lib/ghost/post";
import Card, { CardProps } from "../Card";
import Skeleton from "../Skeleton";
import { CardTitle, SmallCardHeading } from "../text/headings";

export interface PostCardProps extends CardProps {
  post: Post
}

const PostCard: FunctionComponent<PostCardProps> = ({ post, ...cardProps }) => {
  const lang = useLang();
  const url = usePostUrl(post?.slug);

  return (
    <Card
      href={url}
      css={{
        minHeight: "10rem",
      }}
      {...cardProps}
    >
      <SmallCardHeading>{post?.publishedAt ? dayjs(post?.publishedAt).locale(lang).format("HH:mm D MMMM YYYY") : <Skeleton />}</SmallCardHeading>
      <CardTitle>{post?.title || <Skeleton count={2} />}</CardTitle>
    </Card>
  );
};

export default PostCard;
