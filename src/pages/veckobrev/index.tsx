import React from "react";
import { CardGrid, GridItem } from "../../components/basic/CardGrid";
import { SimpleHero } from "../../components/layout/Hero/Simple";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { Navigation } from "../../components/layout/Navigation";
import { Section } from "../../components/layout/Section";
import withAuth from "../../hocs/withAuth";
import { ClientLetter } from "../../lib/news/structures/client/Letter";

const News: React.FunctionComponent = () => {
  const { data } = ClientLetter.useAll();

  const items: GridItem[] = data?.map((letter) => {
    return {
      title: letter.title,
      description: letter.description,
      href: letter.url,
    };
  });

  return (
    <CardGrid
      items={items}
      imagesExpected={false}
      expectedNumberOfItems={12}
      rowLimit={5}
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
