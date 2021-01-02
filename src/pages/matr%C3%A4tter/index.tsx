import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import DishSection from "../../components/dishes/DishSection";
import SimpleHeader from "../../components/header/Simple";

const Page: NextPage = () => (
  <Base
    metadata={{
      title: "Maträtter",
      description: "En bokstavsordnad lista över alla maträtter.",
    }}
    leadingAd
  >
    <SimpleHeader title="Maträtter" sub="En bokstavsordnad lista över alla maträtter." />
    <DishSection />
  </Base>
);

export default Page;
