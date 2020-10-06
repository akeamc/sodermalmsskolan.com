import React from "react";
import { Subject } from "../../lib/digibruh/Subject";
import { GridItem, CardGrid } from "../basic/CardGrid";
import Skeleton from "react-loading-skeleton";
import { Section } from "../layout/Section";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import { GridTitleSection } from "../basic/Typography";
import Link from "next/link";
import { Emoji } from "../basic/Emoji";
import Digibruh from "../../lib/digibruh/Digibruh";

const SubjectsOverview: React.FunctionComponent = () => {
  const { data } = Digibruh.use();

  const subjects: Subject[] = data?.subjects || new Array(3).fill(null);
  const loading = !data;

  return (
    <>
      {subjects.map((subject, index) => {
        let gridItems: GridItem[] = loading
          ? null
          : subject.fields.map((field) => field.toGridItem());

        return (
          <Section key={index}>
            <Base>
              <Col xs={12}>
                <GridTitleSection
                  title={
                    loading ? (
                      <Skeleton />
                    ) : (
                      <Link href={subject.url}>
                        <a style={{ color: "inherit" }}>{subject?.name}</a>
                      </Link>
                    )
                  }
                  description={
                    loading ? (
                      <Skeleton />
                    ) : (
                      <Emoji>{subject?.description}</Emoji>
                    )
                  }
                />
              </Col>
            </Base>
            <CardGrid items={gridItems} imagesExpected={true} />
          </Section>
        );
      })}
    </>
  );
};

export default SubjectsOverview;
