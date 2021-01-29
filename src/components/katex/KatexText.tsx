import React, { FunctionComponent, memo } from "react";
import dynamic from "next/dynamic";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import extractKatex from "../../lib/katex/extractKatex";

export interface KatexTextProps {
  text: string;
}

/**
 * A Katex renderer that dynamically imports Katex **if necessary**.
 *
 * @param {React.PropsWithChildren<KatexTextProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered text.
 */
const KatexText: FunctionComponent<KatexTextProps> = ({ text }) => {
  const fragments = extractKatex(text);

  if (!fragments) {
    return <>{text}</>;
  }

  const Math = dynamic(() => import("./Math"), {
    loading: () => <InlineSkeleton width="25%" />,
  });

  return (
    <>
      {fragments.map((fragment) => {
        if (fragment.type === "math") {
          return <Math display={fragment.display} math={fragment.data} key={fragment.data} />;
        }

        return fragment.data;
      })}
    </>
  );
};

export default memo(KatexText);
