import { css, keyframes } from "@emotion/react";
import React, { FunctionComponent } from "react";

const animation = keyframes({
  "0%": {
    backgroundPosition: "200% 0",
  },

  "100%": {
    backgroundPosition: "-200% 0",
  },
});

export interface SkeletonProps { width?: string, height?: string }

/**
 * CSS styles for a skeleton background.
 */
export const skeletonBackground = css({
  backgroundColor: "var(--skeleton-base)",
  backgroundImage: "linear-gradient(270deg, var(--skeleton-base), var(--skeleton-highlight), var(--skeleton-base))",
  backgroundRepeat: "no-repeat",
  backgroundSize: "200% 100%",
  animation: `${animation} 2s ease-in-out infinite`,
});

/**
 * A loading skeleton, used as a placeholder.
 *
 * @param {React.PropsWithChildren<SkeletonProps>} props Props.
 *
 * @returns {React.ReactElement} The skeleton.
 */
const Skeleton: FunctionComponent<SkeletonProps> = ({ width, height, ...props }) => (
  <span
    css={[skeletonBackground, {
      borderRadius: "0.3125rem",
      display: "inline-block",
      lineHeight: 1,
      width: width ?? "100%",
      height,
    }]}
    {...props}
  />
);

export default Skeleton;
