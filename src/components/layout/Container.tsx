import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 32px;
`;

export const FullPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  padding: var(--section-spacing) var(--page-gutter);
`;
