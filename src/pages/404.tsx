import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import SimpleHeader from "../components/header/Simple";
import MenuText from "../components/menu/Text";

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
      sub={<MenuText />}
    />
  </Base>
);

export default NotFoundPage;
