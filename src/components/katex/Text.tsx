import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import extractKatex from "./extract";
import Skeleton from "../Skeleton";
// import Math from "./Math";

/**
 * A Katex renderer that dynamically imports Katex only when necessary.
 */
const KatexText: FunctionComponent<{text: string}> = ({ text }) => {
  const fragments = extractKatex(text);

  if (!fragments) {
    return <>{text}</>;
  }

  const Math = dynamic(() => import("./Math"), {
    loading: () => <Skeleton width="25%" />,
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
