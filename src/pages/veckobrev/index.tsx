import Link from "next/link";
import React from "react";
import { Base } from "../../components/grid/Base";
import { NormalWidth } from "../../components/grid/Col";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import { Layout } from "../../components/layout/Layout";
import { Navigation } from "../../components/layout/Navigation";
import { Section } from "../../components/layout/Section";
import withAuth from "../../hocs/withAuth";
import { ClientChannel } from "../../lib/discord/structures/client/Channel";

const News: React.FunctionComponent = () => {
  const { data } = ClientChannel.useMessagesInChannel(
    process.env.discordNewsChannel
  );

  return (
    <ul>
      {data?.flat().map((message, index) => (
        <li key={index}>
          <Link href={message.attachments[0].url}>
            <a>{message.content}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Page: React.FunctionComponent = () => {
  return (
    <Layout
      metadata={{
        title: "Veckobrev",
        description: "Veckobrev",
      }}
    >
      <Navigation />
      <HeroWithTitle title="Veckobrev" />
      <Section>
        <Base>
          <NormalWidth>
            <News />
          </NormalWidth>
        </Base>
      </Section>
    </Layout>
  );
};

export default withAuth(Page);
