import React, { FunctionComponent } from "react";
import katex from "katex";
// eslint-disable-next-line import/extensions
import "katex/dist/contrib/mhchem.js";
import "katex/dist/katex.min.css";

const Math: FunctionComponent<{math: string, display?: boolean}> = ({ math, display = false }) => {
  const html = katex.renderToString(math, {
    displayMode: display,
    output: "html",
  });

  return (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{
      __html: html,
    }}
    />
  );
};

export default Math;
