import styled from "styled-components";
import { PostOrPage } from "@tryghost/content-api";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import React from "react";
import { renderMathInText } from "../../lib/utils/katex";
import { Section } from "../layout/Section";
import { Base } from "../grid/Base";
import * as breakpoints from "../../styles/breakpoints";
import { Link as LinkIcon } from "react-feather";
import { Table } from "../basic/Table";
import { Anchor } from "../basic/Typography";
import Link from "next/link";
import { Skeleton } from "../basic/Skeleton";

enum FigureWidth {
  Normal,
  Wide,
  Full,
}

const LinkableHeading = styled.div`
  position: relative;

  a {
    color: inherit !important;
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.foreground};

      & ~ svg {
        visibility: visible;
      }
    }
  }

  svg {
    height: 0.75em;
    width: 0.75em;
    color: ${({ theme }) => theme.colors.muted};
    margin-left: 0.25em;
    visibility: hidden;
    vertical-align: -0.05em;
  }
`;

const Figure = styled.figure<{ width: FigureWidth }>`
  margin: 0;
  ${({ width }) =>
    width != FigureWidth.Normal &&
    `
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: wrap;

    img {
      width: 100vw;
      border-radius: 0;
      box-shadow: none;
    }
  `}

  img {
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadows.medium};

    ${({ width, theme }) => {
      if (width == FigureWidth.Wide)
        return `
        max-width: 1040px;
        border-radius: 0;
        box-shadow: none;

        @media (min-width: 1040px) {
          max-width: 1040px;
          border-radius: 0.5rem;
          box-shadow: ${theme.shadows.medium};
        }
      `;

      if (width == FigureWidth.Full)
        return `
        box-shadow: none;
        border-radius: 0;
      `;
    }}
  }
`;

const FigureCaption = styled.figcaption`
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1em;
  color: ${({ theme }) => theme.colors.muted};
`;

const Embed = styled.div`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;

  &::before {
    padding-top: 56.25%;
    display: block;
    content: "";
  }

  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Divider = styled.div`
  margin: var(--section-spacing) 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  width: 100%;
`;

const Blockquote = styled.blockquote`
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding: 0 0 0 1em;
  margin-left: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1.125rem;
  overflow: hidden;

  p {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const RichText = styled.div`
  grid-column: span 12;

  @media (min-width: ${breakpoints.small}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-column: 3 / span 8;
  }

  @media (min-width: ${breakpoints.extraLarge}) {
    grid-column: 4 / span 6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2em;
  }

  p,
  ul,
  ol {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  em {
    color: ${({ theme }) => theme.colors.foreground};
  }

  > ${Embed}, > ${Figure}, > ${Blockquote}, > img {
    margin-top: 48px;
    margin-bottom: 48px;
  }

  .katex {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const RichTextSection = styled(Section)`
  overflow-x: hidden;
`;

const classNameToFigureWidth = (classNames: string): FigureWidth => {
  for (const className of classNames.split(" ")) {
    if (className == "kg-width-wide") return FigureWidth.Wide;
    if (className == "kg-width-full") return FigureWidth.Full;
  }

  return FigureWidth.Normal;
};

const ArticleBody: React.FunctionComponent<{
  post: PostOrPage | null;
}> = ({ post }) => {
  const text = (node) => {
    return node.children
      .filter((child) => child.type == "text")
      .map((child) => child.data)
      .join("");
  };

  function transform(node, index) {
    if (node.name == "iframe") {
      return (
        <Embed key={index}>
          <iframe src={node.attribs?.src} allowFullScreen />
        </Embed>
      );
    }

    if (node.name == "figure") {
      const width = classNameToFigureWidth(node.attribs.class);

      return (
        <Figure key={index} width={width}>
          {node.children.map(transform)}
        </Figure>
      );
    }

    if (node.name == "figcaption") {
      return <FigureCaption key={index}>{text(node)}</FigureCaption>;
    }

    if (node.name == "img") {
      const { alt, src, loading = "lazy" } = node.attribs;

      return <img key={index} alt={alt} src={src} loading={loading} />;
    }

    if (node.name == "a") {
      const { href } = node.attribs;

      return (
        <Link key={index} href={href} passHref>
          <Anchor>{node.children.map(transform)}</Anchor>
        </Link>
      );
    }

    if (node.name == "blockquote") {
      return (
        <Blockquote key={index}>
          <p>{node.children.map(transform)}</p>
        </Blockquote>
      );
    }

    if (node.name == "hr") {
      return <Divider key={index} />;
    }

    if (node.name == "table") {
      return (
        <Figure width={FigureWidth.Normal} key={index}>
          <Table>{node.children.map(transform)}</Table>
        </Figure>
      );
    }

    if (/^h[1-6]$/i.test(node.name)) {
      const { id } = node.attribs;

      return (
        <node.name id={id} key={index}>
          <LinkableHeading>
            <Anchor href={"#" + id} id={id}>
              {node.children.map(transform)}
            </Anchor>
            <LinkIcon />
          </LinkableHeading>
        </node.name>
      );
    }

    if (node.type == "text") {
      const katexParsed = renderMathInText(node.data);

      if (katexParsed != null) {
        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: katexParsed }} />
        );
      }
    }

    return convertNodeToElement(node, index, transform);
  }

  const parsedHtml = post ? (
    ReactHtmlParser(post?.html, { transform })
  ) : (
    <>
      <h2>
        <Skeleton />
      </h2>
      <p>
        <Skeleton count={23} />
      </p>
    </>
  );

  return (
    <RichTextSection>
      <Base>
        <RichText>{parsedHtml}</RichText>
      </Base>
    </RichTextSection>
  );
};

export default ArticleBody;
