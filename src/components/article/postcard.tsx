import { Author, PostOrPage } from "@tryghost/content-api";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { transparentize } from "polished";
import React, { FunctionComponent } from "react";
import styled, { css, DefaultTheme, useTheme } from "styled-components";
import { useLang } from "../../hooks/lang";
import { getAuthorUrl } from "../../lib/ghost/author";
import { transparentLightPalette } from "../../styles/themes";
import { Skeleton } from "../basic/Skeleton";
import { LineClamped } from "../basic/Typography";
import { getPostUrl } from "../blog/PostGrid";
import Card from "../card";
import CardMeta from "../card/meta";

const borderRadius = "0.5rem";

const TextWrapper = styled.div`
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const BackgroundWrapper = styled.div`
  background-color: #000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${borderRadius};
  z-index: -1;
  overflow: hidden;
  transition: all 0.1s ease-in-out;

  img {
    opacity: 0.25;
    object-fit: cover;
    transition: all 0.1s ease-in-out;
  }
`;

const Title = styled.h3`
  --size-xs: 1.125rem;
  --size-sm: 1.125rem;
  --size-lg: 1.125rem;
  --size-xl: 1.125rem;
  margin: 0;
  font-weight: 500;
`;

const StyledPostCard = styled.a<{ $hasBackground?: boolean }>`
  transition: all 0.1s ease-in-out;
  display: flex;
  height: 100%;
  border-radius: ${borderRadius};
  position: relative;

  &:hover {
    ${BackgroundWrapper} {
      transform: scale(1.025);
      box-shadow: 0 15px 45px -5px ${({ theme }) => transparentize(0.8, theme.colors.foreground)};

      img {
        opacity: 0.625;
      }
    }
  }

  ${({ $hasBackground, theme }) =>
    $hasBackground
      ? css``
      : css`
          border: 1px solid ${theme.colors.border};
        `};
`;

const MetaDetail = styled.span``;

const Meta = styled.span`
  font-family: var(--font-monospace);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin: 0;
  margin-bottom: 1rem;
  display: inline-block;
  font-weight: 400;
  color: ${({ theme }) => transparentize(0.5, theme.colors.foreground)};

  ${MetaDetail} {
    color: ${({ theme }) => transparentize(0.25, theme.colors.foreground)};
  }
`;

const MetaAuthor: FunctionComponent<{ author: Author }> = ({ author }) => {
  return <MetaDetail>{author.name}</MetaDetail>;
};

const Description = styled(LineClamped).attrs({ $lines: 3 })`
  margin-top: 1rem;
  line-height: 1.25;
`;

const PostCard: FunctionComponent<{
  post: PostOrPage;
  digibruh?: boolean;
  href?: string;
}> = ({ post, digibruh, ...props }) => {
  const { title, excerpt, feature_image, slug, published_at, authors } = post;

  const defaultTheme = useTheme();
  const lang = useLang();

  const hasBackground = !!feature_image;

  const theme: DefaultTheme = hasBackground
    ? { ...defaultTheme, colors: transparentLightPalette }
    : defaultTheme;

  const href = props.href || getPostUrl(slug);

  return (
    <Link href={href} passHref>
      <StyledPostCard $hasBackground={hasBackground}>
        <TextWrapper theme={theme}>
          <Meta theme={theme}>
            {authors?.reduce((elements, author, index) => {
              if (index !== 0) {
                elements.push(", ");
              }

              elements.push(<MetaAuthor key={index} author={author} />);

              return elements;
            }, [])}{" "}
            den{" "}
            <MetaDetail>
              {dayjs(published_at).locale(lang).format("D MMMM YYYY")}
            </MetaDetail>
          </Meta>
          <Title>{title || <Skeleton />}</Title>
          <Description>{excerpt}</Description>
        </TextWrapper>
        {feature_image ? (
          <BackgroundWrapper>
            <Image src={feature_image} layout="fill" />
          </BackgroundWrapper>
        ) : null}
      </StyledPostCard>
    </Link>
    // <Card
    //   body={{
    //     title,
    //     description: (
    //       <LineClamped $lines={digibruh ? 5 : 3}>{excerpt}</LineClamped>
    //     ),
    //     background: feature_image,
    //     expectsBackground: !!feature_image,
    //     footer: <CardMeta date={new Date(published_at)} />,
    //   }}
    //   href={getPostUrl(slug)}
    // />
  );
};

export default PostCard;
