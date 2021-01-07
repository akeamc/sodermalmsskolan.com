import React, { FunctionComponent } from "react";
import Ad, { AdProps } from "./Ad";

export type BannerAdProps = Partial<AdProps>;

const BannerAd: FunctionComponent = (props) => (
  <Ad
    format="auto"
    fullWidthResponsive
    {...props}
  />
);

export default BannerAd;
