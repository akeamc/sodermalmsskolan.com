import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section, GridArea } from "../components/basic/Grid";
import { D3 } from "../components/basic/Typography";
import { Header } from "../components/basic/Header";
import { FanartViewer } from "./../components/fanart/FanartViewer";
import AdSense from "react-adsense";

export default class Home extends React.Component {
  render() {
    return (
      <Layout title="Fanart">
        <Header backgroundImage="https://media.discordapp.net/attachments/615945309885038593/615995344538566676/shrek.gif">
          <D3>Konstverk</D3>
        </Header>
        <Section>
          <GridArea spanMobile={4} spanDesktop={12}>
            <AdSense.Google
              client={process.env.adsenseClient}
              slot={process.env.adsenseSlot}
              style={{ display: "block" }}
              format="auto"
              responsive="true"
            />
          </GridArea>
        </Section>
        <Section>
          <GridArea spanMobile={4} spanDesktop={12}>
            <FanartViewer />
          </GridArea>
        </Section>
      </Layout>
    );
  }
}
