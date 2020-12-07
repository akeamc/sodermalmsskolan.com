import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

export const dividerHeight = "15vw";

const Divider: FunctionComponent = () => (
  <div
    css={(theme: Theme) => ({
      backgroundColor: theme.color.background,
      width: "100%",
      height: dividerHeight,
      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${dividerHeight}))`,
      marginTop: -1,
      marginBottom: `calc(${dividerHeight} / -2)`,
    })}
  />
);

export default Divider;
