import css from "@emotion/css";
import { StackStyles } from ".";

export const horizontalInlineStack: StackStyles = ({ spacing }) =>
  css({
    [`> *:not(:last-child)`]: {
      marginRight: spacing,
    },
  });
