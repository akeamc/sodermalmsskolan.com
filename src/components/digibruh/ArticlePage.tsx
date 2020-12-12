import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import Base from "../Base";
import PostView from "../post/PostView";

/**
 * The main component of a Digibruh article page.
 */
const ArticlePage: FunctionComponent<{post: Post}> = ({ post }) => (
  <Base>
    <h1>WORK IN PROGRESS</h1>
    <PostView post={post} />
  </Base>
);

export default ArticlePage;
