import React from "react";
import { Layout } from "../../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../../components/basic/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useDigibruh } from "../../lib/digibruh/Digibruh";
import {
  DigibruhGrid,
  IDigibruhGridItem,
} from "../../components/digibruh/DigibruhGrid";

const Page: React.FunctionComponent = () => {
  const { data } = useDigibruh();
  const loading = !data;

  return (
    <Layout title="Digibruh">
      <Header fixedNav>
        <Col xs={12}>
          <div className="py-8">
            <h1 className="display-2 text-center mb-4">Digibruh.</h1>
            <p className="lead text-center mb-4">
              Ett digitalt läromedel av elever, för elever.
            </p>
          </div>
        </Col>
      </Header>
      <Container>
        {(data?.subjects || []).map((subject, index) => {
          let gridItems: IDigibruhGridItem[] = subject.fields.map(
            ({ name, description, coverImage }) => {
              return {
                title: name,
                description,
                url: "#",
                image: coverImage,
              };
            }
          );

          return (
            <section className="pt-7" key={index}>
              <Row className="row align-items-center mb-5">
                <Col xs={12} className="col-md">
                  <h3 className="mb-0">{subject.name}</h3>
                  <p className="mb-0 text-muted">{subject.description}</p>
                </Col>
              </Row>
              <DigibruhGrid items={gridItems} imagesExpected={true} />
            </section>
          );
        })}
      </Container>
    </Layout>
  );
};

export default Page;
