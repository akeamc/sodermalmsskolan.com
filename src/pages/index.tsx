import React from "react";
import { Layout } from "../components/Layout";
import { Text } from "../components/Text";

export default class Home extends React.Component {
  render() {
    return (
      <Layout title="Södermalmsskolan">
        <Text>God morgon.</Text>
      </Layout>
    );
  }
}
