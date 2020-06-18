import React from "react";
import { NarrowCard } from "../basic/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStudySets } from "../../lib/api/main/quizlet/studysets";
import useSWR from "swr";
import { StudySet } from "../../lib/models/Quizlet";
import Skeleton from "react-loading-skeleton";
import { GenericUser } from "../../lib/models/User";

export class StudySetGridItem extends React.Component<{
  studySet: StudySet | null;
  loading?: boolean;
}> {
  render() {
    const { studySet, loading = false } = this.props;
    const author = new GenericUser({
      name: studySet?.author?.username,
      avatarUrl: studySet?.author?.avatarURL,
      url: `https://quizlet.com/${studySet?.author?.username}`,
    });

    return (
      <NarrowCard
        meta={{
          authors: [author],
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
