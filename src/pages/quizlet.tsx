import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section, GridArea } from "../components/basic/Grid";
import { Header } from "../components/basic/Header";
import { D3 } from "../components/basic/Typography";
import { QuizletViewer } from "../components/quizlet/QuizletViewer";

export default class Quizlet extends React.Component {
  render() {
    return (
      <Layout title="Quizlet">
        <Header>
          <D3>Quizlet</D3>
        </Header>
        <Section>
          <GridArea spanMobile={4} spanDesktop={12}>
            <QuizletViewer></QuizletViewer>
          </GridArea>
        </Section>
      </Layout>
    );
  }
}
