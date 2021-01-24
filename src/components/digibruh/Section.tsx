import React, { FunctionComponent, useMemo } from "react";
import { useDigibruhArticles } from "../../lib/digibruh/hooks/article";
import { LimitParam } from "../../lib/ghost/common";
import { PostFilter } from "../../lib/ghost/post";
import Button from "../button/Button";
import CardGridSection from "../CardGridSection";
import { SectionProps } from "../section/Section";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import ArticleCard from "./ArticleCard";

export interface DigibruhSectionProps extends SectionProps {
  limit?: LimitParam;
  filter?: PostFilter;
  showMoreButton?: boolean;
}

/**
 * A section presenting a few Digibruh articles.
 *
 * @param {React.PropsWithChildren<DigibruhSectionProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered element.
 */
const DigibruhArticleSection: FunctionComponent<DigibruhSectionProps> = ({
  limit = "all", filter = () => true, showMoreButton = false, ...sectionProps
}) => {
  const { data } = useDigibruhArticles(limit);

  const articles = useMemo(() => data?.filter(filter), [data, filter]);

  const skeletonArticles = typeof limit === "number" ? limit : 30;

  return (
    <CardGridSection
      header={{
        superTitle: <>
          {data?.length ?? <InlineSkeleton width="1.5em" />}
          {" "}
          artiklar
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </>,
        title: "Alla artiklar",
      }}
      bottomText={showMoreButton ? <Button href="/digibruh" primary>Öppna Digibruh</Button> : null}
      {...sectionProps}
    >
      {(articles ?? new Array(skeletonArticles).fill(null))
        .map((post, index) => <ArticleCard post={post} key={post?.id ?? index} />)}
    </CardGridSection>
  );
};

export default DigibruhArticleSection;
