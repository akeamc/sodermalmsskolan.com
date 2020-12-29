import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";
import SidebarSection from "../../components/section/SidebarSection";
import TelegramList from "../../components/telegram/TelegramList";
import { DISCORD_INVITE_LINK } from "../../lib/discord/constants";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Nyheter",
    description: "Senaste nytt om Södermalmsskolan.",
  }}
  >
    <SimpleHeader title="Nyheter" sub="Vi är Södermalmsskolans inofficiella nyhetsbyrå." />
    <SidebarSection
      main={(
        <p>
          Veckobreven finns för tillfället på
          {" "}
          <Link href={DISCORD_INVITE_LINK}><a>vår Discordserver</a></Link>
          .
        </p>
)}
      sidebar={<TelegramList />}
      sidebarTitle="Senaste nytt"
    />
  </Base>
);

export default Page;
