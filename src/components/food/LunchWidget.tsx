import styled from "styled-components";
import { Card, CardContent, CardFooter } from "../basic/Card";
import { Button } from "../basic/Button";
import dayjs from "dayjs";
import { firstLetterUpperCase } from "../../lib/utils/letters";
import React from "react";
import { ClientMenu } from "../../lib/food/structures/client/Menu";
import { useLocale } from "../../hooks/locale";
import { Skeleton } from "../basic/Skeleton";
import { Muted } from "../basic/Typography";
import { ArrowRight } from "react-feather";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const WidgetList = styled.ul`
  li:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled.div`
  margin: 24px 0;
`;

const Widget = styled(Card)`
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const Footer = styled(CardFooter)`
  display: flex;
  align-items: space-between;
`;

export const LunchWidget: React.FunctionComponent = () => {
  const { data, isValidating } = ClientMenu.use({ limit: 1 });

  const menu = data ? data[0] : null;

  const dishes = menu?.dishes?.map((dish) => dish.title);

  const { locale } = useLocale();

  const date =
    (menu || isValidating) &&
    (menu?.date ? (
      firstLetterUpperCase(
        dayjs(menu?.date).locale(locale).format("dddd D MMMM")
      )
    ) : (
      <Skeleton width="100px" />
    ));

  return (
    <Widget $hoverable={false}>
      <CardContent>
        <div>
          <Title>Maten</Title>
          <Text>
            {menu || isValidating ? (
              <WidgetList>
                {(dishes || new Array(2).fill(<Skeleton />)).map(
                  (dish, index) => (
                    <li key={index}>{dish}</li>
                  )
                )}
              </WidgetList>
            ) : (
              "Menyn är inte tillgänglig."
            )}
          </Text>
          <Button href="/meny" icon={<ArrowRight />}>
            Meny
          </Button>
        </div>
      </CardContent>
      <Footer>
        <Muted>{date}</Muted>
      </Footer>
    </Widget>
  );
};
