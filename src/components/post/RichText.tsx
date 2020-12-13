import { Theme } from "@emotion/react";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import ReactHtmlParser, { convertNodeToElement, Transform } from "react-html-parser";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import KatexText from "../katex/Text";
import Table from "../Table";

const Figure: FunctionComponent = (props) => (
  <div
    css={{
      marginTop: "4rem",
      marginBottom: "4rem",

      [media(breakpoints.small)]: {
        marginLeft: "-2rem",
        marginRight: "-2rem",
      },

      [media(breakpoints.medium)]: {
        marginLeft: "-4rem",
        marginRight: "-4rem",
      },
    }}
    {...props}
  />
);

const transform: Transform = (node, index) => {
  if (node.name === "a") {
    const { href } = node.attribs;

    return (
      <Link key={index} href={href} passHref>
        <a css={(theme: Theme) => ({
          color: "inherit",
          textDecoration: "underline",

          "&:hover": {
            color: theme.color.accent,
          },
        })}
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
        css={(theme: Theme) => ({
          textAlign: "center",
          margin: 0,
          marginTop: "0.625rem",
          color: theme.color.text.tertiary,
          fontSize: "0.8125rem",
          lineHeight: 1.5,
          letterSpacing: "0.00625em",
        })}
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
        css={(theme: Theme) => ({
          margin: 0,
          padding: 0,
          color: theme.color.accent,
          fontFamily: fonts.monospace,
          fontSize: "1.5rem",
          fontWeight: 400,
          marginTop: "1rem",
          marginBottom: "2rem",
          lineHeight: 1.5,

          [media(breakpoints.medium)]: {
            padding: "2rem 3rem",
          },
        })}
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

  return convertNodeToElement(node, index, transform);
};

/**
 * XSS-safe HTML renderer.
 */
const RichText: FunctionComponent<{html: string}> = ({ html, ...props }) => {
  const parsedHtml = ReactHtmlParser(html, { transform });

  return (
    <div
      css={{
        p: {
          lineHeight: 2,
          letterSpacing: "0.00625em",
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

        h4: {

        },

        h5: {

        },

        h6: {

        },

        "ul, ol": {
        },

        li: {
          marginBottom: "0.5rem",
          lineHeight: 1.7,
        },
      }}
      {...props}
    >
      {parsedHtml}
    </div>
  );
};

export default RichText;
