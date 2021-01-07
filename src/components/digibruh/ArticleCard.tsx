import React, { FunctionComponent } from "react";
import { extractSubjectFromPost } from "../../lib/digibruh/category";
import { useArticleUrl } from "../../lib/digibruh/hooks/article";
import Post from "../../lib/ghost/post";
import Card, { CardProps } from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle, SmallCardHeading } from "../text/headings";

export interface ArticleCardProps extends CardProps {
  post: Post
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({ post, ...cardProps }) => {
  const subject = extractSubjectFromPost(post);
  const url = useArticleUrl(post);

  return (
    <Card
      css={{
        minHeight: "10rem",
      }}
      href={url}
      {...cardProps}
    >
      <SmallCardHeading>{subject?.name || <InlineSkeleton width="10em" />}</SmallCardHeading>
      <CardTitle>{post?.title || <InlineSkeleton count={2} />}</CardTitle>
    </Card>
  );
};

export default ArticleCard;
