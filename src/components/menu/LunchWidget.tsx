import styled from "styled-components";
import { useMenus } from "../../lib/api/main/menu/Menu";
import { Card, CardContent, CardFooter } from "../basic/Card";
import { AutoLink } from "../basic/Link";
import { Button } from "../basic/Button";
import moment from "moment";
import { firstLetterUpperCase } from "../../lib/utils/letters";
import Skeleton from "react-loading-skeleton";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const WidgetList = styled.ul`
  li:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled.p`
  margin: 24px 0;
`;

const Widget = styled(Card)`
  box-shadow: var(--shadow-large);
`;

const Footer = styled(CardFooter)`
  display: flex;
  align-items: space-between;
`;

export const LunchWidget: React.FunctionComponent = () => {
  const { data, isValidating } = useMenus({ limit: 90 });

  const menu = data ? data[0] : null;

  const date =
    (menu || isValidating) &&
    (menu?.timestamp ? (
      firstLetterUpperCase(
        moment(menu?.timestamp).locale("sv").format("dddd D MMMM")
      )
    ) : (
      <Skeleton width={100} />
    ));

  return (
    <Widget>
      <CardContent>
        <div>
          <Title>Maten</Title>
          <Text>
            {menu || isValidating ? (
              <WidgetList>
                {(menu?.dishes || new Array(2).fill(<Skeleton />)).map(
                  (dish, index) => (
                    <li key={index}>{dish}</li>
                  )
                )}
              </WidgetList>
            ) : (
              "Menyn är inte tillgänglig."
            )}
          </Text>
          <Button href="/meny" colored small>
            Meny
          </Button>
        </div>
      </CardContent>
      <Footer>
        <p>{date}</p>
        <p>
          Källa:{" "}
          <AutoLink href="https://skolmaten.se/sodermalmsskolan-gamla-maria/">
            skolmaten.se
          </AutoLink>
          .
        </p>
      </Footer>
    </Widget>
  );
};
