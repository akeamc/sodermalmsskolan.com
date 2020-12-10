import { PostOrPage } from "@tryghost/content-api";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import Card, { CardProps } from "../Card";
import Skeleton from "../Skeleton";
import { CardTitle, SmallCardHeading } from "../text/headings";

export interface PostCardProps extends CardProps {
  post: PostOrPage
}

const PostCard: FunctionComponent<PostCardProps> = ({ post, ...cardProps }) => {
  const lang = useLang();

  return (
    <Card
      href={post?.url}
      css={{
        minHeight: "10rem",
      }}
      {...cardProps}
    >
      <SmallCardHeading>{post?.published_at ? dayjs(post?.published_at).locale(lang).format("HH:mm D MMMM YYYY") : <Skeleton />}</SmallCardHeading>
      <CardTitle>{post?.title || <Skeleton count={2} />}</CardTitle>
    </Card>
  );
};

export default PostCard;
