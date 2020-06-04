import React from "react";
import { StudySet } from "../../api/quizlet/studysets";
import { NarrowCard } from "../basic/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class StudySetGridItem extends React.Component<{
  studySet: StudySet;
}> {
  render() {
    const { author, timestamp, count, url, name } = this.props.studySet;

    return (
      <NarrowCard
        meta={{
          authors: [
            {
              name: author.username,
              avatarUrl: author.avatarURL,
            },
          ],
          date: timestamp,
        }}
        href={url}
      >
        <h3>{name}</h3>
        <p className="mb-0 text-muted">{count} termer</p>
      </NarrowCard>
    );
  }
}

export class StudySetGrid extends React.Component<{
  sets: StudySet[];
}> {
  render() {
    return (
      <Row>
        {this.props.sets.map((set) => (
          <Col xs={12} md={6} lg={4} className="d-flex">
            <StudySetGridItem studySet={set} />
          </Col>
        ))}
      </Row>
    );
  }
}
