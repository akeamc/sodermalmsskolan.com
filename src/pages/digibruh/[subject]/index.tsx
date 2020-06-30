import { Layout } from "../../../components/basic/Layout";
import { Header } from "../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NotFound from "../../404";
import { CardGrid } from "../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../lib/digibruh/Digibruh";
import Row from "react-bootstrap/Row";
import {
  DigibruhPage,
  getInitialDigibruh,
} from "../../../lib/digibruh/utils/initialprops";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = useDigibruh(new Digibruh(props.initialDigibruh));
  const subject = digibruh.getSubjectBySlug(props.subject);

  return (
    <Layout title={subject?.name}>
      <Header fixedNav backgroundImage={subject?.coverImage}>
        <Col xs={12}>
          <h1 className="display-3 text-center text-md-left mb-4">
            {subject?.name}
          </h1>
          <p className="lead text-white-80 text-center text-md-left mb-6 mb-lg-8">
            {subject?.description}
          </p>
        </Col>
      </Header>
      <Container>
        <section className="pt-7 pt-md-10">
          <Row className="mb-5">
            <Col xs={12}>
              <h3 className="mb-0">Områden</h3>
            </Col>
          </Row>
          <CardGrid
            items={(subject?.fields || []).map((field) => field.toGridItem())}
            imagesExpected={true}
            expectedNumberOfItems={3}
          />
        </section>
      </Container>
    </Layout>
  );
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
