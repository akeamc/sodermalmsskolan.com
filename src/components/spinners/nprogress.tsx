import React from "react";
import { useTheme } from "styled-components";
import PageNProgress from "next-styled-nprogress";

/**
 * Wicked progress bar used to trick people into thinking the site is fast.
 */
const NProgress: React.FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageNProgress
      color={theme.colors.primary}
      showSpinner={false}
      height="2px"
    />
  );
};

export default NProgress;
