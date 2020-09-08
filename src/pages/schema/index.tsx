import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/basic/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import { ScheduleView } from "../../components/schedule/ScheduleView";
import { AdSection } from "../../components/basic/Ad";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Schema" }}>
      <Navigation />
      <HeroWithTitle title="Schema" />
      <AdSection />
      <ScheduleView schedules={Schedules} />
    </Layout>
  );
};

export default Page;
