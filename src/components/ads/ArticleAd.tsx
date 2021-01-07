import React, { FunctionComponent } from "react";
import Ad, { AdProps } from "./Ad";

export type ArticleAdProps = Partial<AdProps>;

const ArticleAd: FunctionComponent<ArticleAdProps> = (props) => (
  <Ad
    layout="in-article"
    format="fluid"
    css={{
      textAlign: "center",
    }}
    {...props}
  />
);

export default ArticleAd;
