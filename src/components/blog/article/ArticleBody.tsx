import styled from "styled-components";
import { PostOrPage } from "@tryghost/content-api";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import React from "react";
import { renderMathInText } from "../../../lib/utils/katex";
import { ProgressiveImage } from "../../basic/ProgressiveImage";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Section } from "../../layout/Section";
import { Row } from "../../grid/Row";

enum FigureWidth {
  Normal,
  Wide,
  Full
}

const Figure = styled.figure<{width: FigureWidth}>`
  margin: 0;
  ${({width}) => width != FigureWidth.Normal && `
    display: flex;
    justify-content: center;
    flex-flow: wrap;

    img {
      width: 100vw;
      border-radius: 0;
      box-shadow: none;
    }
  `}

  img {
    border-radius: 8px;
    box-shadow: var(--shadow-medium);

    ${({width}) => {
      if (width == FigureWidth.Wide) return `
        max-width: 1040px;

        @media (min-width: 1040px) {
          border-radius: 8px;
          box-shadow: var(--shadow-medium);
        }
      `

      if (width == FigureWidth.Full) return `
        box-shadow: none;
      `;
    }}
  }
`;

const FigureCaption = styled.figcaption`
  font-size: 14px;
  text-align: center;
  margin-top: 1em;
  color: var(--accents-5);
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
  background-color: var(--accents-2);
  width: 100%;
`;

const Blockquote = styled.blockquote`
  border-left: 2px solid var(--accents-2);
  padding: 0 0 0 1em;
  margin-left: 0;
  color: var(--foreground);
  font-size: 18px;
  overflow: hidden;

  p {
    color: var(--foreground);
  }
`;

const RichText = styled.div`
  grid-column: span 12;

  @media (min-width: 576px) {
    grid-column: 2 / span 10;
  }

  @media (min-width: 768px) {
    grid-column: 3 / span 8;
  }

  @media (min-width: 1200px) {
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
    margin-top: 16px;
    margin-bottom: 16px;
  }

  p {
    line-height: 2;
  }

  > ${Embed}, > ${Figure}, > ${Blockquote}, > img {
    margin-top: 48px;
    margin-bottom: 48px;
  }
`;

const RichTextSection = styled(Section)`
  overflow-x: hidden;
`;

const classNameToFigureWidth = (classNames: string): FigureWidth => {
  for (let className of classNames.split(" ")) {
    if (className == "kg-width-wide") return FigureWidth.Wide;
    if (className == "kg-width-full") return FigureWidth.Full;
  }

  return FigureWidth.Normal;
}

const ArticleBody: React.FunctionComponent<{
  data: PostOrPage | null;
  loading?: boolean;
}> = (props) => {
  const { data, loading = false } = props;

  const text = (node) => {
    return node.children
      .filter((child) => child.type == "text")
      .map((child) => child.data)
      .join("");
  };

  function transform(node, index) {
    if (node.name == "iframe") {
      return (
        <Embed>
          <iframe src={node.attribs?.src} allowFullScreen />
        </Embed>
      );
    }

    if (node.name == "figure") {
      let width = classNameToFigureWidth(node.attribs.class);

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
      return <ProgressiveImage key={index} src={node.attribs.src} />;
    }

    if (node.name == "blockquote") {
      return (
        <Blockquote key={index}>
          <p>
          {node.children.map(transform)}
          </p>
        </Blockquote>
      );
    }

    if (node.name == "pre") {
      const { children } = node;
      if (children.length == 1 && children[0].name == "code") {
        const child = children[0];

        const language = child.attribs.class?.replace("language-", "") || null;

        if (language) {
          // Only use `SyntaxHighlighter` if a language is detected. Otherwise, fall back to the default of Ghost.
          const code = text(child).replace(/\n$/, "");

          return (
            <SyntaxHighlighter language={language} useInlineStyles={false} key={index}>
              {code}
            </SyntaxHighlighter>
          );
        }
      }
    }

    if (node.name == "hr") {
      return <Divider key={index} />;
    }

    if (node.type == "text") {
      let katexParsed = renderMathInText(node.data);
      if (katexParsed != null) {
        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: katexParsed }} />
        );
      }
    }

    return convertNodeToElement(node, index, transform);
  }

  const parsedHtml = ReactHtmlParser(data?.html, { transform });

  return (
    <RichTextSection>
      <Row>
        <RichText>{parsedHtml}</RichText>
      </Row>
    </RichTextSection>
  );
};

export default ArticleBody;
