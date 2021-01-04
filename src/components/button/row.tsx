import React, { FunctionComponent } from "react";
import horizontalInlineStack from "../stack/horizontalInlineStack";

const ButtonRow: FunctionComponent = (props) => (
  <div
    css={horizontalInlineStack({
      spacing: "1rem",
    })}
    {...props}
  />
);

export default ButtonRow;
