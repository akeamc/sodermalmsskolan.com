import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import BlogOverview from "../../components/blog/BlogOverview";

/**
 * The front cover of the blog.
 *
 * @returns {React.ReactElement} The generated JSX.
 */
const BlogIndexPage: NextPage = () => (
  <Base metadata={{
    title: "Blogg",
  }}
  >
    <BlogOverview />
  </Base>
);

export default BlogIndexPage;
