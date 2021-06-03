import React, { FunctionComponent } from "react";
import Ad, { AdProps } from "./Ad";

export type BannerAdProps = Partial<AdProps>;

/**
 * A banner ad.
 *
 * @param {React.PropsWithChildren<BannerAdProps>} props Props.
 *
 * @returns {React.ReactElement} A rendered banner ad.
 */
const BannerAd: FunctionComponent = (props) => (
  <Ad
    format="auto"
    fullWidthResponsive
    {...props}
  />
);

export default BannerAd;
