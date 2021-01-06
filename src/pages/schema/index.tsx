import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";
import ScheduleSection from "../../components/schedule/Section";

/**
 * The schedule page.
 *
 * @returns {React.ReactElement} The JSX element.
 */
const SchedulePage: NextPage = () => (
  <Base
    metadata={{
      title: "Schema",
      description: "Schema.",
    }}
    leadingAd
  >
    <SimpleHeader title="Schema" />
    <ScheduleSection />
  </Base>
);

export default SchedulePage;
