import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import { ScheduleViewer } from "../../components/schedule/Schedule";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/basic/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import { ScheduleMultiView } from "../../components/schedule/MultiView";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Schema" }}>
      <Navigation />
      <HeroWithTitle title="Schema" />
      <ScheduleMultiView schedules={Schedules} />
    </Layout>
  );
};

export default Page;
