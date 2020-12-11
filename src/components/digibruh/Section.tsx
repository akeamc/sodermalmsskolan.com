import React, { FunctionComponent } from "react";
import { useDigibruhArticles } from "../../lib/digibruh/hooks/article";
import { LimitParam } from "../../lib/ghost/common";
import Button from "../button/Button";
import CardGridSection from "../CardGridSection";
import { SectionProps } from "../Section";
import Skeleton from "../Skeleton";
import ArticleCard from "./ArticleCard";

export interface DigibruhSectionProps extends SectionProps {
  limit?: LimitParam;
  showMoreButton?: boolean;
}

/**
 * A section presenting a few Digibruh articles.
 */
const DigibruhArticleSection: FunctionComponent<DigibruhSectionProps> = ({ limit = "all", showMoreButton = false, ...sectionProps }) => {
  const { data } = useDigibruhArticles(limit);

  const skeletonArticles = typeof limit === "number" ? limit : 30;

  return (
    <CardGridSection
      header={{
        superTitle: <>
          {data?.length || <Skeleton width="1.5em" />}
          {" "}
          artiklar
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </>,
        title: "Alla artiklar",
      }}
      bottomText={showMoreButton ? <Button href="/digibruh" primary>Öppna Digibruh</Button> : null}
      {...sectionProps}
    >
      {(data || new Array(skeletonArticles).fill(null))
        .map((post, index) => <ArticleCard post={post} key={post?.id || index} />)}
    </CardGridSection>
  );
};

export default DigibruhArticleSection;
