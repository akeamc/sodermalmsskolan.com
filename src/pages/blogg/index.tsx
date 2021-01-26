import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import BlogHeader from "../../components/blog/Header";

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
    <BlogHeader />
  </Base>
);

export default BlogIndexPage;
