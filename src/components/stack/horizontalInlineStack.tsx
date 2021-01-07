import { css } from "@emotion/react";
import { StackStyles } from ".";

const horizontalInlineStack: StackStyles = ({ spacing }) => css({
  paddingBottom: `-${spacing}`,

  "> *:not(:last-child)": {
    marginRight: spacing,
    paddingBottom: spacing,
  },
});

export default horizontalInlineStack;
