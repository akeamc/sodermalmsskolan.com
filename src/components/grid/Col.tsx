import styled from "styled-components";

export const Col = styled.div<{
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}>`
  grid-column: span ${(props) => props.xs || 12};

  @media (min-width: 576px) {
    grid-column: span ${(props) => props.sm};
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    grid-column: span ${(props) => props.md};
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    grid-column: span ${(props) => props.lg};
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    grid-column: span ${(props) => props.xl};
  }
`;

export const TitleContainer = styled.div`
  grid-column: span 12;
  text-align: center;

  @media (min-width: 768px) {
    grid-column: 2 / span 10;
  }

  @media (min-width: 1200px) {
    grid-column: 3 / span 8;
  }
`;

export const NormalContainer = styled.div`
  grid-column: span 12;

  @media (min-width: 768px) {
    grid-column: 2 / span 10;
  }

  @media (min-width: 1200px) {
    grid-column: 3 / span 8;
  }
`;
