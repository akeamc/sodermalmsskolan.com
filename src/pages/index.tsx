import React from "react";
import { Layout } from "../components/basic/Layout";
import { Header } from "../components/basic/Header";
import * as Icon from "react-feather";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AutoLink } from "../components/basic/AutoLink";
import { MenuGridItem } from "../components/basic/MenuGrid";
import WindowConfetti from "../components/events/Confetti";
import moment from "moment";
import { useMenus } from "../lib/api/main/menu/Menu";

const Page: React.FunctionComponent = () => {
  const { data } = useMenus({ limit: 10 });
  const daysLeft = Math.ceil(
    moment(new Date("2020-08-19T09:50:00+0200")).diff(moment(), "days", true)
  );

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
            Om {daysLeft} {Math.abs(daysLeft) == 1 ? "dag" : "dagar"} börjar
            skolan.
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
              href="/blogg"
            >
              Blogg
            </AutoLink>
          </div>
        </Col>
      </Header>
      <section className="py-8 py-md-11">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <MenuGridItem
                menu={(data || [null])[0]}
                loading={!data}
              ></MenuGridItem>
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
      </section>
    </Layout>
  );
};

export default Page;
