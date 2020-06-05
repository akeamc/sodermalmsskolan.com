import React from "react";
import { NarrowCard } from "../basic/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStudySets } from "../../api/main/quizlet/studysets";
import useSWR from "swr";
import { StudySet } from "../../models/Quizlet";
import Skeleton from "react-loading-skeleton";

export class StudySetGridItem extends React.Component<{
  studySet: StudySet | null;
  loading?: boolean;
}> {
  render() {
    const { studySet, loading = false } = this.props;

    return (
      <NarrowCard
        meta={{
          authors: [
            {
              name: studySet?.author?.username,
              avatarUrl: studySet?.author?.avatarURL,
            },
          ],
          date: studySet?.timestamp,
        }}
        href={studySet?.url}
        loading={loading}
      >
        <h3>{loading ? <Skeleton /> : studySet?.name}</h3>
        <p className="mb-0 text-muted">
          {loading ? <Skeleton /> : <>{studySet?.count} termer </>}
        </p>
      </NarrowCard>
    );
  }
}

export const StudySetGrid: React.FunctionComponent = () => {
  const { data, error } = useSWR("/quizlet/studysets", getStudySets);
  const placeholder = new Array(12).fill(null);

  return (
    <Row>
      {(data || placeholder).map((set, index) => (
        <Col xs={12} md={6} lg={4} key={index} className="d-flex">
          <StudySetGridItem studySet={set} loading={!data} />
        </Col>
      ))}
    </Row>
  );
};
