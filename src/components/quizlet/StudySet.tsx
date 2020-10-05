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
import Skeleton from "react-loading-skeleton";
import Digibruh from "../../lib/digibruh/Digibruh";

export const StudySet: React.FunctionComponent<{
  studySet: ClientStudySet | null;
}> = ({ studySet }) => {

  const { data: digibruh } = Digibruh.use();

  const title = studySet ? "Quizlet" : <Skeleton />;

  const subject = digibruh?.getSubjectBySlug(studySet?.digibruh?.subjects[0]);

  return (
    <Col xs={12} sm={6} md={4}>
      <Link href={studySet?.url || ""} passHref>
        <CardLink>
          <Card>
            <CardContent>
              <CardTitle>{title || <Skeleton />}</CardTitle>
              <CardDescription>{subject?.name || <Skeleton />}</CardDescription>
            </CardContent>
          </Card>
        </CardLink>
      </Link>
    </Col>
  );
};
