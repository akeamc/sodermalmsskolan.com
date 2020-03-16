import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section, GridArea } from "../components/basic/Grid";
import { D3 } from "../components/basic/Typography";
import { Header } from "../components/basic/Header";
import { FanartViewer } from "./../components/fanart/FanartViewer";

export default class Home extends React.Component {
  render() {
    return (
      <Layout title="Fanart">
        <Header>
          <D3>Konstverk</D3>
        </Header>
        <Section>
          <GridArea spanMobile={4} spanDesktop={8} offsetDesktop={2}>
            <FanartViewer />
          </GridArea>
        </Section>
      </Layout>
    );
  }
}
