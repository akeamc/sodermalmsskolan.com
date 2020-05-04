import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section, Grid, GridArea } from "../components/basic/Grid";
import { D2 } from "../components/basic/Typography";
import { Header } from "../components/basic/Header";
import { Image } from "./../components/basic/Image";
import AdSense from "react-adsense";

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Grid>
            <GridArea spanMobile={4} offsetDesktop={1} spanDesktop={4}>
              <D2>Vi visar vad Quality of Life Services betyder</D2>
            </GridArea>
            <GridArea spanMobile={4} offsetDesktop={7} spanDesktop={4}>
              <Image src="https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg" />
            </GridArea>
          </Grid>
        </Header>
        <AdSense.Google
          client={process.env.adsenseClient}
          slot={process.env.adsenseSlot}
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
        <Section>
          <GridArea spanMobile={4} spanDesktop={2}>
            <p>Detta är en &alpha;-version. Berätta gärna vad du tycker!</p>
          </GridArea>
        </Section>
      </Layout>
    );
  }
}
