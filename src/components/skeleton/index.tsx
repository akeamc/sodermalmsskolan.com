import {
  css, keyframes, Theme, useTheme,
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

const lineStyles = (theme: Theme, width?: string) => css({
  backgroundColor: theme.color.skeleton.base,
  backgroundImage: `linear-gradient(90deg, ${theme.color.skeleton.base}, ${theme.color.skeleton.highlight}, ${theme.color.skeleton.base})`,
  backgroundSize: "200px 100%",
  backgroundRepeat: "no-repeat",
  borderRadius: "0.25rem",
  display: "inline-block",
  lineHeight: 1,
  width: width || "100%",
  animation: `${animation} 1.2s ease-in-out infinite`,
});

const Line: FunctionComponent<{ width?: string }> = ({ width, ...props }) => {
  const theme = useTheme();

  return <span css={lineStyles(theme, width)} {...props} />;
};

/**
 * A skeleton, working as a perfect replacement for ANYTHING.
 */
const Skeleton: React.FunctionComponent<{
  count?: number;
  width?: string;
}> = ({ count = 1, width }) => {
  const elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <Line key={i} width={width}>
        &zwnj;
      </Line>,
    );
  }

  return <span>{elements}</span>;
};

export default Skeleton;
