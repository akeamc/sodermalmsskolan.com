import { NextPage } from "next";
import React from "react";
import AuthorSection from "../../components/author/AuthorSection";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";

/**
 * A page listing the authors of the website.
 *
 * @returns {React.ReactElement} The page.
 */
const AuthorsPage: NextPage = () => (
  <Base metadata={{
    title: "Författare",
  }}
  >
    <SimpleHeader title="Författare" />
    <AuthorSection />
  </Base>
);

export default AuthorsPage;
