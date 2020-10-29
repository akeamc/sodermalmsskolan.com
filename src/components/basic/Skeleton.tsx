import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Line = styled.span<{ width?: string }>`
  background-color: ${({ theme }) => theme.colors.skeleton.base};
  background-image: ${({
    theme: {
      colors: { skeleton },
    },
  }) =>
    `linear-gradient(90deg, ${skeleton.base}, ${skeleton.highlight}, ${skeleton.base})`};
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  width: ${({ width }) => width || "100%"};

  animation: ${animation} 1.2s ease-in-out infinite;
`;

export const Skeleton: React.FunctionComponent<{
  count?: number;
  width?: string;
}> = ({ count = 1, width }) => {
  const elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <Line key={i} width={width}>
        &zwnj;
      </Line>
    );
  }

  return <span>{elements}</span>;
};
