import React, { FunctionComponent } from "react";
import katex from "katex";
// eslint-disable-next-line import/extensions
import "katex/dist/contrib/mhchem.js";
import "katex/dist/katex.min.css";

export interface MathProps {
  math: string;
  display?: boolean;
}

/**
 * A component used to render KaTeX to html.
 *
 * @param {React.PropsWithChildren<MathProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered math.
 */
const Math: FunctionComponent<MathProps> = ({ math, display = false }) => {
  const html = katex.renderToString(math, {
    displayMode: display,
    output: "html",
  });

  return (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default Math;
