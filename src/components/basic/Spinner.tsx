import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

const FullPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  padding: var(--section-spacing) var(--page-gutter);
`;

export const FullPageSpinner: React.FunctionComponent = () => (
  <FullPageWrapper>
    <GridLoader />
  </FullPageWrapper>
);
