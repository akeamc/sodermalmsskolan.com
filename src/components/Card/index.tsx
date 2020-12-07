import { css, SerializedStyles, Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

export const cardStyles = (theme: Theme): SerializedStyles => css({
  background: theme.card.background,
  borderRadius: "0.375rem",
  boxShadow: theme.card.boxShadow,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
});

const Card: FunctionComponent = (props) => <div css={cardStyles} {...props} />;

export default Card;
