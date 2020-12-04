import React from "react";
import {
  ClientStudySet,
  useStudySet,
} from "../../lib/quizlet/structures/client/StudySet";
import { useDigibruh } from "../../lib/digibruh/Digibruh";
import { Skeleton } from "../basic/Skeleton";
import Card from "../card";

export const StudySet: React.FunctionComponent<{
  studySet: ClientStudySet | null;
}> = ({ studySet }) => {
  const digibruh = useDigibruh();

  const { data } = useStudySet({ id: studySet?.id });

  const title = data?.details?.title || <Skeleton count={2} />;

  const subject = digibruh?.getSubjectBySlug(studySet?.digibruh?.subjects[0]);
  const field = digibruh?.getFieldBySlug(
    subject?.slug,
    studySet?.digibruh.fields[0]
  );

  return (
    <Card
      href={data?.url}
      body={{
        title: title || <Skeleton />,
        description: (
          <>
            {field?.name || <Skeleton width="50%" />} ·{" "}
            {data?.details?.terms || <Skeleton width="16px" />} termer
          </>
        ),
      }}
    />
  );
};
