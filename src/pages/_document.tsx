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
