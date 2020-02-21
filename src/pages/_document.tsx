import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="sv">
        <Head></Head>
        <body
          style={{
            margin: 0,
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
