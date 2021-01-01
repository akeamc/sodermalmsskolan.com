import React, { FunctionComponent } from "react";
import horizontalInlineStack from "../stack/horizontalInlineStack";

const ButtonRow: FunctionComponent = ({ children }) => (
  <div
    css={[
      horizontalInlineStack({
        spacing: "1rem",
      }),
      {
        marginTop: "2rem",
      },
    ]}
  >
    {children}
  </div>
);

export default ButtonRow;
