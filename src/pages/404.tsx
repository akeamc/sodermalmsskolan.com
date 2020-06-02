import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { Header } from "../components/basic/Header";
import { Navigation } from "../components/basic/Navigation";
import * as Icon from "react-feather";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Navigation />
        <Header>
          <Col sm={12}>
            <h1 className="display-2 text-center mb-4">
              Sidan hittades inte.
            </h1>
            <p className="lead text-muted text-center mb-4">
              Vi ber om ursäkt.
            </p>
            <div className="text-center">
              <Link href="/">
                <Button variant="primary">
                  Gå hem{" "}
                  <Icon.Home
                    className="d-none d-md-inline ml-2"
                    size={20}
                  />
                </Button>
              </Link>
            </div>
          </Col>
        </Header>
      </Layout>
    );
  }
}
