import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import Footer from "../../components/footer/Footer";
import SimpleHeader from "../../components/header/Simple";
import ScheduleSection from "../../components/schedule/Section";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Schema",
    description: "Schema.",
  }}
  >
    <SimpleHeader title="Schema" />
    <ScheduleSection />
    <Footer />
  </Base>
);

export default Page;
