import { css } from "@emotion/react";
import { StackStyles } from ".";

export const horizontalInlineStack: StackStyles = ({ spacing }) =>
  css({
    marginBottom: `-${spacing}`,

    [`> *:not(:last-child)`]: {
      marginRight: spacing,
      marginBottom: spacing,
    },
  });
