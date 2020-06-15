import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import { AutoLink } from "../components/basic/AutoLink";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Om">
        <Header />
        <section className="py-8 py-md-11">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6} lg={8} className="order-md-2">
                <img
                  className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 rounded-lg"
                  src="https://blogg.södermalmsskolan.com/content/images/size/w2000/2020/06/51B4F6D2-3A27-4358-9D00-BC57E8C01774.jpeg"
                />
              </Col>
              <Col xs={12} md={6} lg={4} className="order-md-1">
                <h1>Bakgrund.</h1>
                <p className="text-muted">
                  Södermalmsskolan.com grundades i maj 2019 av Bo Strömberg och
                  Åke Amcoff. Än idag är det nästan bara de som lägger tid på
                  projektet. Vi startade med en vision – idéen att bilder på
                  Sodexos fantastiska, gudomliga mat skulle vara offentliga och
                  integrerade med en lättåtkomlig meny.
                </p>
                <p className="text-muted">
                  Det tog dock inte lång tid innan vi började med en blogg.
                  Först ut var en artikel om oss, kallad Om oss, och{" "}
                  <AutoLink href="https://xn--sdermalmsskolan-8sb.com/blogg/problemet-med-skolmaten/">
                    en artikel om matproblemet
                  </AutoLink>{" "}
                  som renoverats mycket sedan den publicerades. Dessa tidiga
                  artiklar skrevs i{" "}
                  <AutoLink href="https://sv.wikipedia.org/wiki/Markdown">
                    MarkDown
                  </AutoLink>{" "}
                  och var jobbiga att lägga in. Nu använder vi{" "}
                  <AutoLink href="https://ghost.org/">Ghost</AutoLink> för
                  bloggen och{" "}
                  <AutoLink href="https://discord.gg/ubH4DKw">
                    vår Discordserver
                  </AutoLink>{" "}
                  för smidiga inlägg. Vi har även tagit emot flera{" "}
                  <AutoLink href="/donationer">donationer</AutoLink> från
                  fantastiska personer.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}
