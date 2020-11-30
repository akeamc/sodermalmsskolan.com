import { createGlobalStyle } from "styled-components";
import * as breakpoints from "./breakpoints";

export default createGlobalStyle`
  html {
    font-family: var(--font-sans);
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
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
    
    --navigation-height: 4rem;

    @media (min-width: ${breakpoints.small}) {
      
    }

    @media (min-width: ${breakpoints.medium}) {
      --page-gutter: 2.5rem;
    }

    @media (min-width: ${breakpoints.large}) {
      --section-spacing: 7.5rem;
      --grid-gap: 2rem;
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
    background-color: ${({ theme }) => theme.colors.code};
  }

  pre {
    padding: 1rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: ${({ theme }) => theme.colors.code};
    border-radius: 8px;

    code {
      background-color: transparent;
    }
  }

  :focus {
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    word-wrap: break-word;

    &, p {
      margin: 0;
    }
  }

  * {
    font-size: var(--size-sm);

    @media (min-width: ${breakpoints.medium}) {
      font-size: var(--size-md);
    }

    @media (min-width: ${breakpoints.large}) {
      font-size: var(--size-lg);
    }

    @media (min-width: ${breakpoints.extraLarge}) {
      font-size: var(--size-xl);
    }
  }

  small {
    font-size: 14px;
  }
  
  strong {
    color: ${({ theme }) => theme.colors.foreground};
  }

  p {
    line-height: 1.5;
    letter-spacing: -.02em;
    margin: 1em 0;
  }

  h1 {
    --size-sm: 2.5rem;
    --size-md: 3rem;
    --size-lg: 4rem;
    --size-xl: 4rem;
    font-weight: 700;
    letter-spacing: -.1rem;
    line-height: 1.1;
  }

  h2 {
    --size-sm: 1.75rem;
    --size-md: 2rem;
    --size-lg: 2.25rem;
    --size-xl: 2.25rem;
    letter-spacing: -.05rem;
    font-weight: 600;
  }

  h3 {
    --size-sm: 1.5rem;
    --size-md: 1.5rem;
    --size-lg: 1.5rem;
    --size-xl: 1.5rem;
    letter-spacing: -.05rem;
    font-weight: 600;
  }

  h4 {
    --size-lg: 1.25rem;
    --size-lg: 1.25rem;
    --size-lg: 1.25rem;
    --size-xl: 1.25rem;
    letter-spacing: -.020625rem;
    font-weight: 600;
  }


  h5 {
    --size-sm: 1.5rem;
    --size-md: 1.5rem;
    --size-lg: 1.5rem;
    --size-xl: 1.5rem;
    letter-spacing: -.05em;
    font-weight: 600;
  }

  h6 {
    --size-sm: 1rem;
    --size-md: 1rem;
    --size-lg: 1rem;
    --size-xl: 1rem;
    letter-spacing: -.05em;
    font-weight: 600;
  }

  img {
    width: 100%;
  }

  a {
    text-decoration: none;
    transition: color 0.2s ease;
  }

  ul, ol {
    margin: 0;

    li {
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.foreground};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-left: 24px;

    li::before {
      content: "–";
      display: inline-block;
      color: ${({ theme }) => theme.colors.muted};
      position: absolute;
      margin-left: -15px;
    }
  }
`;
