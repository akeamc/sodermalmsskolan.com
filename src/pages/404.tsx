import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import * as Icon from "react-feather";
import { AutoLink } from "../components/basic/AutoLink";

export default class NotFound extends React.Component {
  render() {
    return (
      <Layout>
        <Header backgroundImage="/assets/shrek.png" fixedNav>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-2 text-center mb-4">
                Sidan hittades inte.
              </h1>
              <p className="lead text-white-80 text-center mb-4">
                Vi ber om ursäkt.
              </p>
              <div className="text-center">
                <AutoLink href="/" className="btn btn-primary lift lift-lg">
                  Gå hem{" "}
                  <Icon.Home className="d-none d-md-inline ml-2" size={20} />
                </AutoLink>
              </div>
            </div>
          </Col>
        </Header>
      </Layout>
    );
  }
}
