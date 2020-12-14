import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import Base from "../Base";
import Footer from "../footer/Footer";
import Section from "../Section";
import PostHeader from "./PostHeader";
import PostView from "./PostView";

export interface PostPageProps {
  post: Post;
  digibruh?: boolean;
}

const PostPage: FunctionComponent<PostPageProps> = ({ post, digibruh = false }) => (
  <Base metadata={{
    title: post?.title,
    description: post?.excerpt,
  }}
  >
    <PostHeader post={post} />
    <Section>
      <PostView post={post} />
    </Section>
    <Footer />
  </Base>
);

export default PostPage;
