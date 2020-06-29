import React from "react";
import { Subject } from "../../lib/digibruh/Subject";
import { GridItem, CardGrid } from "../basic/CardGrid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";
import { useDigibruh } from "../../lib/digibruh/Digibruh";
import { AutoLink } from "../basic/AutoLink";

const SubjectsOverview: React.FunctionComponent = () => {
  const { data } = useDigibruh();

  const subjects: Subject[] = data?.subjects || new Array(3).fill(null);
  const loading = !data;

  return (
    <>
      {subjects.map((subject, index) => {
        let gridItems: GridItem[] = loading
          ? null
          : subject.fields.map((field) => field.toGridItem());

        return (
          <section className="pt-7" key={index}>
            <Row className="align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">
                  {loading ? <Skeleton /> : subject?.name}
                </h3>
                <p className="mb-0 text-muted">
                  {loading ? <Skeleton /> : subject?.description}
                </p>
              </Col>
              <Col xs={12} md="auto">
                <AutoLink
                  href={subject?.url}
                  className="mt-4 mt-md-0 btn btn-outline-gray-300 btn btn-outline-primary btn-sm"
                >
                  Visa allt
                </AutoLink>
              </Col>
            </Row>
            <CardGrid items={gridItems} imagesExpected={true} />
          </section>
        );
      })}
    </>
  );
};

export default SubjectsOverview;
