import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import Base from "../Base";
import Container from "../Container";
import PostView from "../post/PostView";
import Skeleton from "../Skeleton";

const BlogPostPage: FunctionComponent<{post: Post}> = ({ post }) => (
  <Base>
    <h1>{post?.title || <Skeleton />}</h1>
    <Container>
      <PostView post={post} />
    </Container>
  </Base>
);

export default BlogPostPage;
