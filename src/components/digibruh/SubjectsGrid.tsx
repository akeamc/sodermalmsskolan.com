import useSWR from "swr";
import { getTags } from "../../lib/api/ghost/tag";
import { Subject } from "../../lib/models/Digibruh";
import Row from "react-bootstrap/Row";
import { NarrowCard } from "../basic/Card";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";

const SubjectsGridItem: React.FunctionComponent<{
  subject: Subject | null;
  loading?: boolean;
}> = (props) => {
  const { subject, loading = false } = props;

  const numberOfFields = subject?.fields?.length || 0;

  return (
    <NarrowCard
      href={"/digibruh/" + subject?.slug}
      image={subject?.coverImage}
      imageExpected={true}
    >
      <h3>{subject?.name}</h3>
      <p className="mb-0 text-muted">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {numberOfFields}{" "}
            {Math.abs(numberOfFields) == 1 ? "område" : "områden"}
          </>
        )}
      </p>
    </NarrowCard>
  );
};

const SubjectsGrid: React.FunctionComponent = () => {
  const { data: tags } = useSWR(`blog/tags`, getTags);
  const loading = !tags;

  const subjects = tags ? Subject.fromTags(tags) : null;
  const placeholder = new Array(3).fill(null);

  return (
    <Row>
      {(subjects || placeholder).map((subject, index) => {
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <SubjectsGridItem loading={loading} subject={subject} />
          </Col>
        );
      })}
    </Row>
  );
};

export default SubjectsGrid;
