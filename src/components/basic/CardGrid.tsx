import styled from "styled-components";
import React from "react";
import { GenericUser } from "../../lib/models/User";
import {
  Card,
  CardContent,
  CardHero,
  CardFooter,
  CardTitle,
} from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import { Col } from "../grid/Col";
import { Row } from "../grid/Row";
import { LinkBlock } from "./Link";
import moment from "moment";
import { AuthorGroup } from "./Avatar";
import * as breakpoints from "../../styles/breakpoints";
import { Emoji } from "./Emoji";
import { useLocale } from "../../hooks/locale";

export function getLineClamp(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

export interface GridItem {
  title: React.ReactNode;
  description: React.ReactNode;
  image?: string;
  meta?: {
    authors: GenericUser[];
    date: Date;
  };
  href: string;
}

const ItemLink = styled(LinkBlock)`
  flex: 1;
`;

const GridItemCard = styled(Card)`
  height: 100%;
`;

const Description = styled.p`
  margin-bottom: 0;
`;

class CardGridItem extends React.Component<{
  item: GridItem | null;
  imageExpected: boolean;
  loading: boolean;
  lineClamp: number | null;
}> {
  render() {
    const { item, loading, lineClamp } = this.props;
    const descriptionRows = 3;
    const { locale } = useLocale();

    return (
      <ItemLink href={item?.href}>
        <GridItemCard>
          <CardHero backgroundImage={item?.image} />
          <CardContent>
            <CardTitle>{loading ? <Skeleton /> : item?.title}</CardTitle>
            <Description style={lineClamp ? getLineClamp(lineClamp) : {}}>
              {loading ? (
                <Skeleton count={descriptionRows} />
              ) : (
                <Emoji>{item?.description}</Emoji>
              )}
            </Description>
          </CardContent>
          {item?.meta ? (
            <CardFooter>
              <p>
                {moment(item?.meta.date).locale(locale).format("D MMMM YYYY")}
              </p>
              <AuthorGroup authors={item.meta.authors} />
            </CardFooter>
          ) : null}
        </GridItemCard>
      </ItemLink>
    );
  }
}

const ItemContainer = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled(Row)`
  @media (min-width: ${breakpoints.extraLarge}) {
    grid-gap: 32px;
  }
`;

export const CardGrid: React.FunctionComponent<{
  items: GridItem[];
  imagesExpected: boolean;
  expectedNumberOfItems?: number;
  rowLimit?: number | null;
  containerless?: boolean;
}> = (props) => {
  const {
    items,
    imagesExpected = true,
    expectedNumberOfItems = 3,
    rowLimit = null,
    containerless = false,
  } = props;
  const placeholder = new Array<GridItem>(expectedNumberOfItems).fill(null);

  let grid = (items || placeholder).map((item, index) => {
    return (
      <ItemContainer xs={12} md={6} lg={4} key={index}>
        <CardGridItem
          item={item}
          loading={!items}
          imageExpected={imagesExpected}
          lineClamp={rowLimit}
        />
      </ItemContainer>
    );
  });

  return containerless ? <>{grid}</> : <GridContainer>{grid}</GridContainer>;
};
