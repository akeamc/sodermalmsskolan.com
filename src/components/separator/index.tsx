import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

const Separator: FunctionComponent = () => (
  <div
    css={(theme: Theme) => ({
      backgroundColor: theme.color.background,
      width: "100%",
      height: "15vw",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))",
      marginTop: -1,
    })}
  />
);

export default Separator;
