import Link from "next/link";
import React from "react";
import { Anchor } from "../../components/basic/Typography";
import { Base } from "../../components/grid/Base";
import { NormalWidth } from "../../components/grid/Col";
import { SimpleHero } from "../../components/layout/Hero/Simple";
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
          <Link href={message.attachments[0].url} passHref>
            <Anchor>{message.content}</Anchor>
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
      <SimpleHero title="Veckobrev" />
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
