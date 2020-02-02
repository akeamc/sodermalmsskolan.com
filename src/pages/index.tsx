import React from "react";
import { Layout } from "../components/basic/Layout";
import { MonthViewer } from "../components/menu/MonthViewer";

export default class Home extends React.Component {
  render() {
    return (
      <Layout title="södermalmsskolan.com">
        <MonthViewer />
      </Layout>
    );
  }
}
