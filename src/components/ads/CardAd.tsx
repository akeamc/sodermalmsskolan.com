import React, { FunctionComponent } from "react";
import Ad, { AdProps } from "./Ad";

export type CardAdProps = Partial<AdProps>;

const CardAd: FunctionComponent<CardAdProps> = (props) => (
  <Ad layoutKey="-h5-5+1v-2l-d" format="fluid" {...props} />
);

export default CardAd;
