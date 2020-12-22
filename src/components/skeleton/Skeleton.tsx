import {
  css,
  keyframes, SerializedStyles, Theme, useTheme,
} from "@emotion/react";
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
export const skeletonBackground = (theme: Theme): SerializedStyles => css({
  backgroundColor: theme.color.skeleton.base,
  backgroundImage: `linear-gradient(270deg, ${theme.color.skeleton.base}, ${theme.color.skeleton.highlight}, ${theme.color.skeleton.base})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "200% 100%",
  animation: `${animation} 2s ease-in-out infinite`,
});

/**
 * A loading skeleton, used as a placeholder.
 */
const Skeleton: FunctionComponent<SkeletonProps> = ({ width, height, ...props }) => {
  const theme = useTheme();

  return (
    <span
      css={[skeletonBackground(theme), {
        borderRadius: "0.3125rem",
        display: "inline-block",
        lineHeight: 1,
        width: width || "100%",
        height,
      }]}
      {...props}
    />
  );
};

export default Skeleton;
