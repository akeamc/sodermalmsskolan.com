import React from "react";
import GridLoader from "react-spinners/GridLoader";
import { FullPageWrapper } from "../layout/Container";

export const FullPageSpinner: React.FunctionComponent = () => (
  <FullPageWrapper>
    <GridLoader />
  </FullPageWrapper>
);
