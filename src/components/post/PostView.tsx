import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import { breakpoints, media } from "../../styles/breakpoints";
import RichText from "./RichText";

const PostView: FunctionComponent<{post: Post}> = ({ post }) => (
  <div css={{
    maxWidth: "43.25rem",
    margin: "0 auto",

    [media(breakpoints.small)]: {
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },

    [media(breakpoints.medium)]: {
      paddingLeft: "6rem",
      paddingRight: "6rem",
    },
  }}
  >
    <RichText html={post?.html} />
  </div>
);

export default PostView;
