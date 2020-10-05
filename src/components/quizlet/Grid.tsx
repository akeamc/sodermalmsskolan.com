import React from "react";
import { ClientStudySet } from "../../lib/quizlet/structures/client/StudySet";
import { StudySet } from "./StudySet";
import { Base } from "../grid/Base";

export const StudySetGrid: React.FunctionComponent<{ field?: string }> = ({
  field,
}) => {
  const { data } = ClientStudySet.useAll();

  const sets = data;

  const items: ClientStudySet[] = sets || new Array(3).fill(null);

  return (
    <Base>
      {items.map((studySet, index) => (
        <StudySet studySet={studySet} key={index} />
      ))}
    </Base>
  );
};
