import { Layout } from "../components/basic/Layout";
import { Navigation } from "../components/basic/Navigation";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--navigation-height));
`;

const TitleContainer = styled.div`
  margin: var(--section-spacing) 0;
  text-align: center;

  h1 {
    margin-bottom: 0.625rem;
  }
`;

const Page: React.FunctionComponent = () => {
  return (
    <Layout title="Sidan hittades inte">
      <Navigation />
      <Main>
        <TitleContainer>
          <h1>404</h1>
          <h4>Sidan hittades inte.</h4>
        </TitleContainer>
      </Main>
    </Layout>
  );
};

export default Page;
