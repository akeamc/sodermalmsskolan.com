import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

export const dividerHeight = "15vw";

const Divider: FunctionComponent = (props) => (
  <div
    css={(theme: Theme) => ({
      backgroundColor: theme.color.background,
      width: "100%",
      height: dividerHeight,
    })}
    {...props}
  />
);

export const UpperDivider: FunctionComponent = () => (
  <Divider css={{
    clipPath: `polygon(0 0, 100% ${dividerHeight}, 100% 100%, 0 100%)`,
    marginTop: 0,
    marginBottom: -1,
  }}
  />
);

export const LowerDivider: FunctionComponent = () => (
  <Divider css={{
    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${dividerHeight}))`,
    marginTop: -1,
    marginBottom: `calc(-0.5 * ${dividerHeight})`,
  }}
  />
);
