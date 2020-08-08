import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-gap: var(--grid-gap);
  grid-template-columns: repeat(12, 1fr);
  max-width: var(--max-page-width);
  margin: 0 auto;
  padding: 0 var(--page-gutter);
`;
