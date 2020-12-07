import React, { FunctionComponent } from "react";
import { horizontalInlineStack } from "../stack/inline";

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
