import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import { breakpoints, media } from "../../styles/breakpoints";
import VerticalAd from "../ads/VerticalAd";
import Card from "../Card";
import MenuText from "../menu/Text";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";
import RichText from "./RichText";

const SidebarSection: FunctionComponent = (props) => (
  <div
    css={{
      margin: "2rem 0",
    }}
    {...props}
  />
);

const PostView: FunctionComponent<{post: Post}> = ({ post }) => (
  <div css={{
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",

    [media(breakpoints.large)]: {
      flexDirection: "row",
    },
  }}
  >
    <div css={{
      flex: "0 1 43.25rem",

      [media(breakpoints.small)]: {
        padding: "0 2rem",
      },

      [media(breakpoints.medium)]: {
        padding: "0 6rem",
      },

      [media(breakpoints.large)]: {
        paddingRight: "4rem",
      },
    }}
    >
      <RichText html={post?.html} />
    </div>
    <div css={{
      flex: "0 1 20rem",
    }}
    >
      <div css={{
        position: "sticky",
        top: "calc(var(--navbar-height) + 2rem)",
        marginTop: "2rem",

        [media(breakpoints.large)]: {
          marginTop: 0,
        },
      }}
      >
        <SidebarSection>
          <VerticalAd />
        </SidebarSection>
        <SidebarSection>
          <Card href="/meny">
            <CardTitle>Dagens lunch</CardTitle>
            <CardDescription>
              <MenuText />
            </CardDescription>
          </Card>
        </SidebarSection>
      </div>
    </div>
  </div>
);

export default PostView;
