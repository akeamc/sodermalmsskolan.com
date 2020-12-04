import React from "react";
import { Subject } from "../../lib/digibruh/Subject";
import { Section } from "../layout/Section";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import { GridTitleSection } from "../basic/Typography";
import Link from "next/link";
import { Emoji } from "../basic/Emoji";
import { useDigibruh } from "../../lib/digibruh/Digibruh";
import { Skeleton } from "../basic/Skeleton";
import CardGrid from "../card/grid";
import { FieldCard } from "./field";

const SubjectsOverview: React.FunctionComponent = () => {
  const digibruh = useDigibruh();

  const subjects: Subject[] = digibruh?.subjects || new Array(3).fill(null);
  const loading = !digibruh;

  return (
    <>
      {subjects.map((subject, index) => {
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
            <CardGrid
              cards={subject?.fields?.map((field, index) => (
                <FieldCard key={index} field={field} />
              ))}
            />
          </Section>
        );
      })}
    </>
  );
};

export default SubjectsOverview;
