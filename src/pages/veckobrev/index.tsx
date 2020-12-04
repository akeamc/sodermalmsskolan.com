import React from "react";
import { getLineClamp } from "../../components/basic/CardGrid";
import { Skeleton } from "../../components/basic/Skeleton";
import { LineClamped, Muted } from "../../components/basic/Typography";
import Card from "../../components/card";
import CardGrid from "../../components/card/grid";
import { SimpleHero } from "../../components/layout/Hero/Simple";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { Navigation } from "../../components/layout/Navigation";
import { Section } from "../../components/layout/Section";
import withAuth from "../../hocs/withAuth";
import ClientLetter, {
  useLetters,
} from "../../lib/news/structures/client/letter";

const LetterCard: React.FunctionComponent<{ letter: ClientLetter }> = ({
  letter,
}) => {
  const rowLimit = 5;
  const pages = letter?.attachment?.pages;

  return (
    <Card
      href={letter?.url}
      body={{
        title: letter?.title || <Skeleton />,
        description: (
          <LineClamped $lines={rowLimit}>
            {letter?.description || <Skeleton count={rowLimit} />}
          </LineClamped>
        ),
        footer: (
          <Muted>
            {pages ? (
              `${pages} ${Math.abs(pages) === 1 ? "sida" : "sidor"}`
            ) : (
              <Skeleton width="4em" />
            )}
          </Muted>
        ),
      }}
    />
  );
};

const News: React.FunctionComponent = () => {
  const { data } = useLetters();

  const letters: ClientLetter[] = data || new Array(12).fill(null);

  return (
    <CardGrid
      cards={letters.map((letter, index) => (
        <LetterCard letter={letter} key={index} />
      ))}
    />
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
