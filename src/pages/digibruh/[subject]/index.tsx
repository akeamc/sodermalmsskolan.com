import { Layout } from "../../../components/basic/Layout";
import { Header } from "../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { Subject } from "../../../lib/models/Digibruh";
import { FieldPostGridAuto } from "../../../components/digibruh/FieldPostGrid";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.subject?.toString();
    const subject = await Subject.get(slug);

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    return {
      props: { subjectObj: subject.toObject(), errorCode: null },
    };
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        subjectObj: null,
        errorCode: statusCode,
      },
    };
  }
};

const Page: React.FunctionComponent = ({
  subjectObj,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errorCode) {
    return <NotFound />;
  }

  // Convert the object to a class.
  let subject = new Subject(subjectObj);

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
      {subject.fields.map((field, index) => (
        <section className="pt-7 pt-md-10" key={index}>
          <Container>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">{field.name}</h3>
                <p className="mb-0 text-muted">{field.description}</p>
              </Col>
            </Row>
            <FieldPostGridAuto field={field} />
          </Container>
        </section>
      ))}
    </Layout>
  );
};

export default Page;
