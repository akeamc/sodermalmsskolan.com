import React from "react";
import styled from "styled-components";
import { Card, CardContent } from "../basic/Card";
import { getPosts } from "../../lib/api/ghost/post";
import useSWR from "swr";
import { useProgressiveImage } from "../basic/ProgressiveImage";
import { TextColorModifier, LeadText } from "../basic/Typography";
import { LinkBlock } from "../basic/Link";
import { getPostUrl } from "./PostGrid";
import { getLineClamp } from "../basic/CardGrid";
import moment from "moment";
import PostMeta from "./meta/PostMeta";
import * as breakpoints from "../../styles/breakpoints";
import Skeleton from "react-loading-skeleton";

const CardWrapper = styled(LinkBlock)`
  grid-column: span 12;
`;

const BigCard = styled(Card)<{ image: string }>`
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("${({
    image,
  }) => useProgressiveImage(image).src}");
  background-size: cover;
  background-position: center;
`;

const BigCardContent = styled(CardContent)`
  padding: 3rem;
  max-width: 400px;

  @media (min-width: ${breakpoints.medium}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;

const FeaturedPost: React.FunctionComponent = () => {
  const { data, isValidating } = useSWR("/blog/posts?limit=1", () =>
    getPosts(1)
  );

  const post = data ? data[0] : null;
  const loading = isValidating && !data;
  const excerptLineLimit = 5;

  return (
    <CardWrapper href={getPostUrl(post?.slug)}>
      <BigCard image={post?.feature_image}>
        <BigCardContent>
          <TextColorModifier bright>
            <h2>{loading ? <Skeleton count={3} /> : post?.title}</h2>
            <LeadText style={getLineClamp(excerptLineLimit)}>
              {loading ? <Skeleton count={excerptLineLimit} /> : post?.excerpt}
            </LeadText>
            <PostMeta
              post={post}
              dateText={moment(post?.published_at)
                .locale("sv")
                .format("D MMMM YYYY")}
            />
          </TextColorModifier>
        </BigCardContent>
      </BigCard>
    </CardWrapper>
  );
};

export default FeaturedPost;
