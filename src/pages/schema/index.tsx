import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import { Layout } from "../../components/layout/Layout";
import { Navigation } from "../../components/layout/Navigation";
import { SimpleHero } from "../../components/layout/Hero/Simple";
import { ScheduleView } from "../../components/schedule/ScheduleView";
import { AdSection } from "../../components/basic/Ad";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Schema" }}>
      <Navigation />
      <SimpleHero title="Schema" />
      <AdSection />
      <ScheduleView schedules={Schedules} />
    </Layout>
  );
};

export default Page;
