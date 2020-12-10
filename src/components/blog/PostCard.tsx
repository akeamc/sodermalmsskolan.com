import { PostOrPage } from "@tryghost/content-api";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import Card from "../Card";
import Skeleton from "../Skeleton";
import { CardTitle, SmallCardHeading } from "../text/headings";

const PostCard: FunctionComponent<{post: PostOrPage}> = ({ post }) => {
  const lang = useLang();

  return (
    <Card href={post?.url}>
      <SmallCardHeading>{post?.published_at ? dayjs(post?.published_at).locale(lang).format("HH:mm D MMMM YYYY") : <Skeleton />}</SmallCardHeading>
      <CardTitle>{post?.title || <Skeleton count={2} />}</CardTitle>
    </Card>
  );
};

export default PostCard;
