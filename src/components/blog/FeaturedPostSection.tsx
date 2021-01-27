import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import Section, { SectionProps } from "../section/Section";
import PostTitle from "./PostTitle";

/**
 * A section displaying a featured blog post.
 *
 * @param {React.PropsWithChildren<SectionProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered post.
 */
const FeaturedPostSection: FunctionComponent<SectionProps> = ({
  ...sectionProps
}) => {
  const { data } = usePosts(1);

  return (
    <Section {...sectionProps}>
      <PostTitle post={data?.[0]} layout="background" size="large" />
    </Section>
  );
};

export default FeaturedPostSection;
