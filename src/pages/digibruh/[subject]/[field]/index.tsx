import { Layout } from "../../../../components/basic/Layout";
import { Header } from "../../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../../404";
import { CardGrid, GridItem } from "../../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../../lib/digibruh/Digibruh";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import useSWR from "swr";
import { PostOrPage } from "@tryghost/content-api";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const digibruh = await Digibruh.initialize();
    const subjectSlug = query.subject?.toString();
    const fieldSlug = query.field?.toString();

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    if (digibruh.getFieldBySlug(subjectSlug, fieldSlug)) {
      return {
        props: {
          subject: subjectSlug,
          field: fieldSlug,
          errorCode: null,
        },
      };
    } else {
      throw new Error("Field not found!");
    }
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        subject: null,
        field: null,
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
  const field = loading
    ? null
    : digibruh.getFieldBySlug(props.subject, props.field);
  const postSWR = useSWR(field?.url, () => {
    return field?.posts();
  });

  const posts: PostOrPage[] = postSWR.data || [];

  const items: GridItem[] = posts.map(
    ({ title, excerpt, slug, feature_image }) => {
      return {
        title,
        description: excerpt,
        url: field.postUrl(slug),
        image: feature_image,
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

export default Page;
