import { Layout } from "../../../components/basic/Layout";
import { Header } from "../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { CardGrid, GridItem } from "../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../lib/digibruh/Digibruh";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const digibruh = await Digibruh.initialize();
    const slug = query.subject?.toString();

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    if (digibruh.getSubjectBySlug(slug)) {
      return {
        props: {
          subject: slug,
          errorCode: null,
        },
      };
    } else {
      throw new Error("Subject not found!");
    }
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        subject: null,
        errorCode: statusCode,
      },
    };
  }
};

const Page: React.FunctionComponent = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = useDigibruh();
  const loading = !digibruh;

  const subject = loading ? null : digibruh.getSubjectBySlug(props.subject);

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

export default Page;
