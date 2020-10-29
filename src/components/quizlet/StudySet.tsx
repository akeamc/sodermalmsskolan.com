import React from "react";
import { ClientStudySet } from "../../lib/quizlet/structures/client/StudySet";
import { Col } from "../grid/Col";
import {
  Card,
  CardContent,
  CardLink,
  CardTitle,
  CardDescription,
} from "../basic/Card";
import Link from "next/link";
import Digibruh from "../../lib/digibruh/Digibruh";
import { Skeleton } from "../basic/Skeleton";

export const StudySet: React.FunctionComponent<{
  studySet: ClientStudySet | null;
}> = ({ studySet }) => {
  const { data: digibruh } = Digibruh.use();

  const { data } = ClientStudySet.use(studySet?.id);

  const title = data?.details?.title || <Skeleton count={2} />;

  const subject = digibruh?.getSubjectBySlug(studySet?.digibruh?.subjects[0]);
  const field = digibruh?.getFieldBySlug(
    subject?.slug,
    studySet?.digibruh.fields[0]
  );

  const description = (
    <>
      {field?.name || <Skeleton width="50%" />} ·{" "}
      {data?.details?.terms || <Skeleton width="16px" />} termer
    </>
  );

  return (
    <Col xs={12} sm={6} md={4}>
      <Link href={data?.url || ""} passHref>
        <CardLink>
          <Card>
            <CardContent>
              <CardTitle>{title || <Skeleton />}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardContent>
          </Card>
        </CardLink>
      </Link>
    </Col>
  );
};
