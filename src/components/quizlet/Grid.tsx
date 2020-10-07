import React from "react";
import { ClientStudySet } from "../../lib/quizlet/structures/client/StudySet";
import { StudySet } from "./StudySet";
import { Base } from "../grid/Base";

export const StudySetGrid: React.FunctionComponent<{ field?: string }> = ({
  field,
}) => {
  const { data } = ClientStudySet.useAll();

  let studySets: ClientStudySet[] =
    data?.filter(
      (studySet) => !field || studySet.digibruh.fields.includes(field)
    ) || new Array(3).fill(null);

  return (
    <Base>
      {studySets.map((studySet, index) => (
        <StudySet studySet={studySet} key={index} />
      ))}
    </Base>
  );
};