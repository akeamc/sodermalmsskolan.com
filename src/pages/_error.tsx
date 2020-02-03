import { Layout } from "../components/basic/Layout";
import { H1 } from "../components/basic/Text";
import React from "react";
import { Button } from "../components/basic/Button";
import Link from "next/link";

export default class Error extends React.Component<{ statusCode: number }> {
  static getInitialProps({ res, error }) {
    const statusCode = res ? res.statusCode : error ? error.statusCode : 404;
    return { statusCode };
  }

  render() {
    switch (this.props.statusCode) {
      case 404:
        return (
          <Layout title="Sidan hittades inte">
            <Link href="/">
              <a>
              <Button>Gå hem</Button>
              </a>
            </Link>
          </Layout>
        );
      default:
        return (
          <Layout title="Ett okänt fel inträffade">
            <H1>Det är allt vi vet</H1>
          </Layout>
        );
    }
  }
}
