import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import Marquee from "react-fast-marquee";

/**
 * A simple banner, used for urgent messages.
 */
const Banner: FunctionComponent = ({ children }) => (
  <div
    css={(theme: Theme) => ({
      backgroundColor: theme.color.accent,
      color: theme.color.text.white,
    })}
  >
    <Marquee direction="left" pauseOnHover gradient={null} speed={20}>
      <div css={{
        whiteSpace: "nowrap",
        padding: "0.75rem 0",
      }}
      >
        {children}
      </div>
    </Marquee>
  </div>
);

export default Banner;
