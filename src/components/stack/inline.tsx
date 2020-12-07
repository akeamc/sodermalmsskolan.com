import { css } from "@emotion/react";
import { StackStyles } from ".";

export const horizontalInlineStack: StackStyles = ({ spacing }) => css({
  paddingBottom: `-${spacing}`,

  "> *:not(:last-child)": {
    marginRight: spacing,
    paddingBottom: spacing,
  },
});
