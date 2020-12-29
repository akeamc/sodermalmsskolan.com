import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import BlogHeader from "../../components/blog/Header";
import PostListSection from "../../components/blog/PostListSection";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Blogg",
  }}
  >
    <BlogHeader />
    <PostListSection />
  </Base>
);

export default Page;
