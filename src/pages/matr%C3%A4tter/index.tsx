import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import DishSection from "../../components/dishes/DishSection";
import Footer from "../../components/footer/Footer";
import SimpleHeader from "../../components/header/Simple";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Maträtter",
    description: "En bokstavsordnad lista över alla maträtter.",
  }}
  >
    <SimpleHeader title="Maträtter" sub="En bokstavsordnad lista över alla maträtter." />
    <DishSection />
    <Footer />
  </Base>
);

export default Page;
