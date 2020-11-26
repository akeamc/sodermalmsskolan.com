import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardLink,
  CardTitle,
} from "../../components/basic/Card";
import { getLineClamp } from "../../components/basic/CardGrid";
import { Skeleton } from "../../components/basic/Skeleton";
import { Base } from "../../components/grid/Base";
import { Col } from "../../components/grid/Col";
import { SimpleHero } from "../../components/layout/Hero/Simple";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { Navigation } from "../../components/layout/Navigation";
import { Section } from "../../components/layout/Section";
import withAuth from "../../hocs/withAuth";
import { ClientLetter } from "../../lib/news/structures/client/Letter";
import { Letter } from "../../lib/news/structures/shared/Letter";

const LetterCard: React.FunctionComponent<{ letter: Letter }> = ({
  letter,
}) => {
  const { data } = ClientLetter.use(letter?.id);

  const rowLimit = 5;

  return (
    <CardLink href={letter?.url}>
      <Card $hoverable={!!letter?.url}>
        <CardContent>
          <CardTitle>{letter?.title || <Skeleton />}</CardTitle>
          <CardDescription style={getLineClamp(rowLimit)}>
            {data?.description || <Skeleton count={5} />}
          </CardDescription>
        </CardContent>
      </Card>
    </CardLink>
  );
};

const News: React.FunctionComponent = () => {
  const { data } = ClientLetter.useAll();

  const letters: ClientLetter[] = data || new Array(12).fill(null);

  return (
    <Base>
      {letters.map((letter, index) => (
        <Col xs={12} md={6} lg={4} key={index}>
          <LetterCard letter={letter} />
        </Col>
      ))}
    </Base>
  );
};

const Page: React.FunctionComponent = () => {
  return (
    <DefaultLayout
      metadata={{
        title: "Veckobrev",
        description: "Veckobrev",
      }}
    >
      <Navigation />
      <SimpleHero title="Veckobrev" />
      <Section>
        <News />
      </Section>
    </DefaultLayout>
  );
};

export default withAuth(Page);
