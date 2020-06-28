import React from "react";
import { Subject } from "../../lib/digibruh/Subject";
import { IDigibruhGridItem, DigibruhGrid } from "./DigibruhGrid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";
import { useDigibruh } from "../../lib/digibruh/Digibruh";

const SubjectsOverview: React.FunctionComponent = () => {
  const { data } = useDigibruh();

  const subjects: Subject[] = data?.subjects || new Array(3).fill(null);
  const loading = !data;

  return (
    <>
      {subjects.map((subject, index) => {
        let gridItems: IDigibruhGridItem[] = loading
          ? null
          : subject.fields.map(({ name, description, coverImage }) => {
              return {
                title: name,
                description,
                url: "#",
                image: coverImage,
              };
            });

        return (
          <section className="pt-7" key={index}>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">
                  {loading ? <Skeleton /> : subject.name}
                </h3>
                <p className="mb-0 text-muted">
                  {loading ? <Skeleton /> : subject.description}
                </p>
              </Col>
            </Row>
            <DigibruhGrid items={gridItems} imagesExpected={true} />
          </section>
        );
      })}
    </>
  );
};

export default SubjectsOverview;
