import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import extractKatex from "./extract";
import InlineSkeleton from "../skeleton/InlineSkeleton";

/**
 * A Katex renderer that dynamically imports Katex only when necessary.
 *
 * @param props
 * @param props.text
 */
const KatexText: FunctionComponent<{text: string}> = ({ text }) => {
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

export default KatexText;
