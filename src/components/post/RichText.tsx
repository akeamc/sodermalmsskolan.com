import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";
import ReactHtmlParser, { convertNodeToElement, Transform } from "react-html-parser";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import KatexText from "../katex/KatexText";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import Skeleton from "../skeleton/Skeleton";
import Table from "../Table";

/**
 * Figure used in posts.
 *
 * @param {React.PropsWithChildren} props Standard HTML props.
 *
 * @returns {React.ReactElement} Rendered figure.
 */
const Figure: FunctionComponent = (props) => (
  <div
    css={{
      "--figure-margin-x": "0px",
      "--figure-margin-y": "4rem",

      margin: "var(--figure-margin-y) var(--figure-margin-x)",

      [media(breakpoints.small)]: {
        "--figure-margin-x": "-2rem",
      },

      [media(breakpoints.medium)]: {
        "--figure-margin-x": "-3rem",
      },
    }}
    {...props}
  />
);

/**
 * Function used to transform the HTML elements.
 *
 * @param {any} node The node.
 * @param {any} index Index of the element.
 *
 * @returns {React.ReactElement} The transformed element.
 */
const transform: Transform = (node, index) => {
  if (node.name === "a") {
    const { href } = node.attribs;

    return (
      <Link key={index} href={href} passHref>
        <a css={{
          color: "inherit",
          textDecoration: "underline",

          "&:hover": {
            color: "var(--link-color)",
          },
        }}
        >
          {node.children.map(transform)}
        </a>
      </Link>
    );
  }

  if (node.name === "figure") {
    return <Figure key={index}>{node.children.map(transform)}</Figure>;
  }

  if (node.name === "iframe") {
    return (
      <Figure key={index}>
        <div css={{
          position: "relative",
          display: "block",
          width: "100%",
          overflow: "hidden",

          "&::before": {
            paddingTop: "56.25rem",
            display: "block",
            content: "\"\"",
          },
        }}
        >
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe
            css={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              border: 0,
              width: "100%",
              height: "100%",
            }}
            src={node.attribs?.src}
            allowFullScreen
          />
        </div>
      </Figure>
    );
  }

  if (node.name === "figcaption") {
    return (
      <figcaption
        key={index}
        css={{
          textAlign: "center",
          margin: 0,
          marginTop: "0.625rem",
          color: "var(--color-text-tertiary)",
          fontSize: "0.8125rem",
          lineHeight: 1.5,
          letterSpacing: "0.00625em",
        }}
      >
        {node.children.map(transform)}
      </figcaption>
    );
  }

  if (node.name === "img") {
    const { alt, src } = node.attribs;

    return (
      <img
        key={index}
        css={{
          width: "100%",
          borderRadius: "0.5rem",
        }}
        src={src}
        alt={alt}
        loading="lazy"
      />
    );
  }

  if (node.name === "blockquote") {
    return (
      <blockquote
        key={index}
        css={{
          margin: 0,
          padding: 0,
          color: "var(--color-highlight)",
          fontFamily: fonts.monospace,
          fontSize: "1.5rem",
          fontWeight: 400,
          marginTop: "1rem",
          marginBottom: "2rem",
          lineHeight: 1.5,

          [media(breakpoints.medium)]: {
            padding: "2rem 3rem",
          },
        }}
      >
        {node.children.map(transform)}
      </blockquote>
    );
  }

  if (node.name === "table") {
    return <Table key={index}>{node.children.map(transform)}</Table>;
  }

  if (node.type === "text") {
    return <KatexText text={node.data} key={index} />;
  }

  const element = convertNodeToElement(node, index, transform);

  return element;
};

export interface RichTextProps {
  html: string;
}

/**
 * XSS-safe HTML renderer.
 *
 * @param {React.PropsWithChildren<RichTextProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered HTML.
 */
const RichText: FunctionComponent<RichTextProps> = ({ html, ...props }) => {
  const parsedHtml = useMemo(() => {
    if (html) {
      return ReactHtmlParser(html, { transform });
    }

    return (
      <>
        <h2>
          <InlineSkeleton />
        </h2>
        <p>
          <InlineSkeleton count={5} />
        </p>
        <Skeleton height="20rem" />
      </>
    );
  }, [html]);

  return (
    <div
      css={{
        p: {
          lineHeight: 2,
          letterSpacing: "0.00625em",
          overflowX: "hidden",
        },

        "> *": {
          marginTop: "1rem",
          marginBottom: "2rem",
        },

        h2: {
          fontSize: "1.75rem",
          lineHeight: 1.2,
          fontWeight: 700,
          letterSpacing: "-0.025em",

          [media(breakpoints.medium)]: {
            fontSize: "2rem",
          },

          [media(breakpoints.large)]: {
            fontSize: "2.25rem",
          },
        },

        h3: {
          fontSize: "1.375rem",
          lineHeight: 1.5,

          [media(breakpoints.medium)]: {
            fontSize: "1.5rem",
          },
        },

        li: {
          marginBottom: "0.5rem",
          lineHeight: 1.7,
        },

        hr: {
          border: 0,
          borderTop: "1px solid var(--color-border-primary)",
        },
      }}
      {...props}
    >
      {parsedHtml}
    </div>
  );
};

export default RichText;
