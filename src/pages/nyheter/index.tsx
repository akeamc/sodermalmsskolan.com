import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import Footer from "../../components/footer/Footer";
import SimpleHeader from "../../components/header/Simple";
import SidebarSection from "../../components/section/SidebarSection";
import TelegramList from "../../components/telegram/TelegramList";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Nyheter",
    description: "Senaste nytt om Södermalmsskolan.",
  }}
  >
    <SimpleHeader title="Nyheter" sub="Vi är Södermalmsskolans inofficiella nyhetsbyrå." />
    <SidebarSection main={<p>VECKOBREV?</p>} sidebar={<TelegramList />} sidebarTitle="Senaste nytt" />
    <Footer />
  </Base>
);

export default Page;
