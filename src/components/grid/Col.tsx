import styled from "styled-components";
import * as breakpoints from "../../styles/breakpoints";

export const Col = styled.div<{
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}>`
  grid-column: span ${(props) => props.xs || 12};

  @media (min-width: ${breakpoints.small}) {
    grid-column: span ${(props) => props.sm};
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: ${breakpoints.medium}) {
    grid-column: span ${(props) => props.md};
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: ${breakpoints.large}) {
    grid-column: span ${(props) => props.lg};
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: ${breakpoints.extraLarge}) {
    grid-column: span ${(props) => props.xl};
  }
`;

export const NormalWidth = styled.div`
  grid-column: span 12;

  @media (min-width: ${breakpoints.medium}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${breakpoints.extraLarge}) {
    grid-column: 3 / span 8;
  }
`;

export const ResponsiveHalf = styled.div`
  grid-column: span 12;

  @media (min-width: ${breakpoints.medium}) {
    grid-column: span 9;
  }

  @media (min-width: ${breakpoints.extraLarge}) {
    grid-column: span 6;
  }
`;
