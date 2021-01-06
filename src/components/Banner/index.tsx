import React, { FunctionComponent } from "react";
import Marquee from "react-fast-marquee";

/**
 * A simple banner, used for urgent messages.
 *
 * @param props
 * @param props.children
 */
const Banner: FunctionComponent = ({ children, ...props }) => (
  <div
    css={{
      backgroundColor: "var(--color-highlight)",
      color: "#ffffff",
    }}
    {...props}
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
