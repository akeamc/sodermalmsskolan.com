import { Layout } from "../../../../components/basic/Layout";
import { Header } from "../../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NotFound from "../../../404";
import { CardGrid, GridItem } from "../../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../../lib/digibruh/Digibruh";
import Row from "react-bootstrap/Row";
import useSWR from "swr";
import { PostOrPage } from "@tryghost/content-api";
import {
  DigibruhPage,
  getInitialDigibruh,
} from "../../../../lib/digibruh/utils/initialprops";
import { GenericUser } from "../../../../lib/models/User";
import React from "react";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = useDigibruh(new Digibruh(props.initialDigibruh));
  const field = digibruh.getFieldBySlug(props.subject, props.field);
  const postSWR = useSWR(field?.url, () => {
    return field?.posts();
  });

  const posts: PostOrPage[] = postSWR.data || [];

  const items: GridItem[] = posts.map(
    ({
      title,
      excerpt,
      slug,
      feature_image,
      updated_at,
      published_at,
      authors,
    }) => {
      return {
        title,
        description: excerpt,
        url: field.postUrl(slug),
        image: feature_image,
        meta: {
          date: new Date(updated_at || published_at),
          authors: authors.map(GenericUser.fromAuthor),
        },
      };
    }
  );

  return (
    <Layout title={field?.name}>
      <Header fixedNav backgroundImage={field?.coverImage}>
        <Col xs={12}>
          <h1 className="display-3 text-center text-md-left mb-4">
            {field?.name}
          </h1>
          <p className="lead text-white-80 text-center text-md-left mb-6 mb-lg-8">
            {field?.description}
          </p>
        </Col>
      </Header>
      <Container>
        <section className="pt-7 pt-md-10">
          <Row className="mb-5">
            <Col xs={12}>
              <h3 className="mb-0">Artiklar</h3>
            </Col>
          </Row>
          <CardGrid
            items={items}
            imagesExpected={true}
            expectedNumberOfItems={3}
            rowLimit={5}
          />
        </section>
      </Container>
    </Layout>
  );
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
