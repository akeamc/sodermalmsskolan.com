import React, { useEffect, useState } from "react";
import { Layout } from "../components/basic/Layout";
import { Header } from "../components/basic/Header";
import * as Icon from "react-feather";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AutoLink } from "../components/basic/AutoLink";
import { MenuGridItem } from "../components/menu/MenuGrid";
import WindowConfetti from "../components/events/Confetti";
import moment from "moment";
import { useMenus } from "../lib/api/main/menu/Menu";
import { Section } from "../components/basic/Section";

const SecondCountdown: React.FunctionComponent<{ end: Date }> = ({ end }) => {
  const getSecondsLeft = () => moment(end).diff(moment(), "seconds");

  let [secondsLeft, setSecondsLeft] = useState(getSecondsLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsLeft());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      <span className="count-up">{secondsLeft}</span>{" "}
      {Math.abs(secondsLeft) == 1 ? "sekund" : "sekunder"}
    </span>
  );
};

const Page: React.FunctionComponent = () => {
  const { data } = useMenus({ limit: 1 });
  const bigDay = new Date(1597823400000);
  const daysLeft = Math.ceil(moment(bigDay).diff(moment(), "days", true));

  return (
    <Layout>
      <WindowConfetti />
      <Header>
        <Col xs={12} md={5} lg={6} className="order-md-2">
          <img
            src="https://cdn.discordapp.com/attachments/705522103985635394/717096876016664596/SHREK_BETA1.png"
            className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 rounded-lg"
          />
        </Col>
        <Col xs={12} md={7} lg={6} className="order-md-1">
          {/* <h1 className="display-3 text-center text-md-left mb-4">
            Sodexo, DigiLär och <span className="text-primary">memes</span>.
          </h1>
          <p className="lead text-muted text-center text-md-left mb-6 mb-lg-8">
            Vi visar vad Quality of Life Services egentligen betyder.
          </p> */}
          <h1 className="display-3 text-center text-md-left mb-4">
            Glad sommar!
          </h1>
          <p className="lead text-muted text-center text-md-left mb-6 mb-lg-8">
            Om <SecondCountdown end={bigDay} /> börjar skolan.
          </p>

          <div className="text-center text-md-left">
            <AutoLink
              className="btn btn-primary mr-2 lift lift-lg"
              href="/meny"
            >
              Visa menyn{" "}
              <Icon.ArrowRight className="d-none d-md-inline ml-2" size={20} />
            </AutoLink>
            <AutoLink
              className="btn btn-primary-soft lift lift-lg"
              href="/digibruh"
            >
              Digibruh
              <Icon.BookOpen className="d-none d-md-inline ml-2" size={20} />
            </AutoLink>
          </div>
        </Col>
      </Header>
      <Section>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <MenuGridItem menu={(data || [null])[0]} loading={!data} />
              <AutoLink
                className="btn btn-primary mr-2 lift lift-lg"
                href="/meny"
              >
                Hela menyn{" "}
                <Icon.ArrowRight
                  className="d-none d-md-inline ml-2"
                  size={20}
                />
              </AutoLink>
            </Col>
          </Row>
        </Container>
      </Section>
    </Layout>
  );
};

export default Page;
