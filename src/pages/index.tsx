import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section, Grid, GridArea } from "../components/basic/Grid";
import { D2, H1 } from "../components/basic/Typography";
import { Header } from "../components/basic/Header";

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Grid>
            <GridArea spanMobile={4} spanDesktop={6}>
              <D2>Vi visar vad Quality of Life Services betyder</D2>
            </GridArea>
          </Grid>
        </Header>
        <Section>
          <H1>Detta är en alfaversion. Berätta gärna vad du tycker!</H1>
        </Section>
      </Layout>
    );
  }
}
