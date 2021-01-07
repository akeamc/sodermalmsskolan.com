import React, { FunctionComponent } from "react";
import Ad, { AdProps } from "./Ad";

export type VerticalAdProps = Partial<AdProps>;

const VerticalAd: FunctionComponent<VerticalAdProps> = (props) => (
  <Ad
    format="auto"
    fullWidthResponsive
    {...props}
  />
);

export default VerticalAd;
