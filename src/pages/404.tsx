import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import SimpleHeader from "../components/header/Simple";

/**
 * The `HTTP 404` page of the website.
 *
 * @returns {React.ReactElement} A very helpful and informative page guiding the user back to
 * safety.
 */
const NotFoundPage: NextPage = () => (
  <Base metadata={{
    title: "Sidan hittades inte",
    noIndex: true,
  }}
  >
    <SimpleHeader
      title="Sidan hittades inte"
    />
  </Base>
);

export default NotFoundPage;
