import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from "next/document";
import React from "react";

interface Props extends DocumentInitialProps {
  styles: React.ReactElement;
}

/**
 * A customized Next.js `Document`.
 */
export default class MyDocument extends Document<Props> {
  /**
   * Render the document.
   *
   * @returns {React.ReactElement} The document.
   */
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
