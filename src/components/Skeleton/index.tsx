import {
  keyframes, Theme,
} from "@emotion/react";
import React, { FunctionComponent } from "react";

const animation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

interface LineProps { width?: string, height?: string }

const Line: FunctionComponent<LineProps> = ({ width, height, ...props }) => (
  <span
    css={(theme: Theme) => ({
      backgroundColor: theme.color.skeleton.base,
      backgroundImage: `linear-gradient(90deg, ${theme.color.skeleton.base}, ${theme.color.skeleton.highlight}, ${theme.color.skeleton.base})`,
      backgroundSize: "200px 100%",
      backgroundRepeat: "no-repeat",
      borderRadius: "0.25rem",
      display: "inline-block",
      lineHeight: 1,
      width: width || "100%",
      height,
      animation: `${animation} 1.2s ease-in-out infinite`,
    })}
    {...props}
  />
);

/**
 * A skeleton, working as a perfect replacement for ANYTHING.
 */
const Skeleton: React.FunctionComponent<{
  count?: number;
  width?: string;
  height?: string;
}> = ({ count = 1, width, height }) => {
  const elements = [];

  for (let i = 0; i < count; i += 1) {
    elements.push(
      <Line key={i} width={width} height={height}>
        &zwnj;
      </Line>,
    );
  }

  return <span>{elements}</span>;
};

export default Skeleton;
