import { createGlobalStyle } from "styled-components";
import * as breakpoints from "./breakpoints";

export default createGlobalStyle`
  html {
    font-family: var(--font-sans);
    background: var(--background);
    color: var(--foreground);
    transition: color 0.1s ease, background-color 0.1s ease;
    font-feature-settings: "calt", "case";

    scroll-padding-top: calc(var(--navigation-height) + 1rem);
  }

  @supports (font-variation-settings: normal) {
    :root {
      --font-sans: "Inter var", var(--font-system); 
    }
  }

  body {
    margin: 0;
  }

  :root {
    --font-sans: "Inter", var(--font-system);
    --font-system: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    --font-monospace: "Source Code Pro", monospace;

    --page-gutter: 1.5rem;
    --max-page-width: 78rem;
    --section-spacing: 3rem;
    --grid-gap: 1.5rem;

    /* Colors */
    --foreground: black;
    --background: white;
    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999;
    --accents-4: #888;
    --accents-5: #666;
    --accents-6: #444;
    --accents-7: #333;
    --accents-8: #111;

    --color-success: #0070f3;

    --color: var(--color-success);

    --code-background: rgba(27, 31, 35, 0.05);

    --navigation-background: rgba(255, 255, 255, 1);
    --navigation-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
    --navigation-height: 4rem;

    --shadow-color: var(--accents-2);
    --shadow-smallest: 0px 4px 8px var(--shadow-color);
    --shadow-small: 0 5px 10px var(--shadow-color);
    --shadow-medium: 0 8px 30px var(--shadow-color);
    --shadow-large: 0 30px 60px var(--shadow-color);
    --shadow-hover: 0 30px 60px var(--shadow-color);

    /* Bo tycker att dark mode är fult. */
    @media (prefers-color-scheme: dark) {
      --foreground: white;
      --background: black;

      --accents-8: #fafafa;
      --accents-7: #eaeaea;
      --accents-6: #999;
      --accents-5: #888;
      --accents-4: #666;
      --accents-3: #444;
      --accents-2: #333;
      --accents-1: #111;

      --navigation-background: rgba(0, 0, 0, 1);
      --navigation-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);

      --shadow-color: rgba(255, 255, 255, 0.1);

      --shadow-smallest: 0 0 0 1px var(--shadow-color);
      --shadow-small: 0 0 0 1px var(--shadow-color);
      --shadow-medium: 0 0 0 1px var(--shadow-color);
      --shadow-large: 0 0 0 1px var(--shadow-color);
      --shadow-hover: 0 0 0 1px var(--shadow-color);
    }

    @media (min-width: ${breakpoints.small}) {
      
    }

    @media (min-width: ${breakpoints.medium}) {
      --page-gutter: 2.5rem;
    }

    @media (min-width: ${breakpoints.large}) {
      --section-spacing: 7.5rem;
    }
  }

  code {
    font-family: "Source Code Pro", monospace;
  }

  :not(pre) > code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    color: inherit;
    white-space: nowrap;
    border-radius: 6px;
    background-color: var(--code-background);
  }

  pre {
    padding: 1rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: var(--code-background);
    border-radius: 8px;

    code {
      background-color: transparent;
    }
  }

  /*
  github.com style (c) Vasily Polovnyov <vast@whiteants.net>
  */

  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #008080;
  }

  .hljs-string,
  .hljs-doctag {
    color: #d14;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #900;
    font-weight: bold;
  }

  .hljs-subst {
    font-weight: normal;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: #000080;
    font-weight: normal;
  }

  .hljs-regexp,
  .hljs-link {
    color: #009926;
  }

  .hljs-symbol,
  .hljs-bullet {
    color: #990073;
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: #0086b3;
  }

  .hljs-meta {
    color: #999;
    font-weight: bold;
  }

  .hljs-deletion {
    background: #fdd;
  }

  .hljs-addition {
    background: #dfd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: var(--size-sm);
    word-wrap: break-word;

    @media (min-width: ${breakpoints.medium}) {
      font-size: var(--size-md);
    }

    @media (min-width: ${breakpoints.large}) {
      font-size: var(--size-lg);
    }
  }

  small {
    font-size: 14px;
  }
  
  strong {
    color: var(--foreground);
  }

  p {
    color: var(--accents-5);
    line-height: 1.6;
    letter-spacing: -.02em;
    margin: 1em 0;
  }

  h1 {
    --size-sm: 2.5rem;
    --size-md: 3rem;
    --size-lg: 4rem;
    font-weight: 600;
    letter-spacing: -.1rem;
    line-height: 1;
  }

  h2 {
    --size-sm: 1.75rem;
    --size-md: 2rem;
    --size-lg: 2.25rem;
    letter-spacing: -.05rem;
    font-weight: 600;
  }

  h3 {
    --size-sm: 1.5rem;
    --size-md: 1.5rem;
    --size-lg: 1.5rem;
    letter-spacing: -.05rem;
    font-weight: 600;
  }

  h4 {
    --size-lg: 1.25rem;
    --size-lg: 1.25rem;
    --size-lg: 1.25rem;
    letter-spacing: -.020625rem;
    font-weight: 600;
  }


  h5 {
    --size-sm: 1.5rem;
    --size-md: 1.5rem;
    --size-lg: 1.5rem;
    letter-spacing: -.05em;
    font-weight: 600;
  }

  h6 {
    --size-sm: 1rem;
    --size-md: 1rem;
    --size-lg: 1rem;
    letter-spacing: -.05em;
    font-weight: 600;
  }

  img {
    width: 100%;
  }

  a {
    color: var(--color);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--foreground);
    }
  }

  ul, ol {
    margin: 0;

    li {
      margin-bottom: 10px;
      color: var(--foreground);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-left: 24px;

    li::before {
      content: "–";
      display: inline-block;
      color: var(--accents-4);
      position: absolute;
      margin-left: -15px;
    }
  }
`;
