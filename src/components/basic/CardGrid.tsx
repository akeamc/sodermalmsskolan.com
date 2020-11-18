import styled from "styled-components";
import React from "react";
import { GenericUser } from "../../lib/models/User";
import {
  Card,
  CardContent,
  CardHero,
  CardFooter,
  CardTitle,
  CardLink,
  CardDescription,
} from "../basic/Card";
import { Col } from "../grid/Col";
import { Base } from "../grid/Base";
import { AuthorGroup } from "./Avatar";
import { Emoji } from "./Emoji";
import { useLocale } from "../../hooks/locale";
import { Skeleton } from "./Skeleton";
import { Muted } from "./Typography";
import dayjs from "dayjs";

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

const CardGridItem: React.FunctionComponent<{
  item: GridItem | null;
  imageExpected: boolean;
  loading: boolean;
  lineClamp: number | null;
}> = ({ item, loading, lineClamp }) => {
  const descriptionRows = 3;
  const { locale } = useLocale();

  return (
    <CardLink href={item?.href}>
      <Card>
        {loading || item?.image ? <CardHero src={item?.image} /> : null}
        <CardContent>
          <CardTitle>{loading ? <Skeleton /> : item?.title}</CardTitle>
          {loading || item?.description ? (
            <CardDescription style={lineClamp ? getLineClamp(lineClamp) : {}}>
              {loading ? (
                <Skeleton count={descriptionRows} />
              ) : (
                <Emoji>{item?.description}</Emoji>
              )}
            </CardDescription>
          ) : null}
        </CardContent>
        {item?.meta ? (
          <CardFooter>
            <Muted>
              {dayjs(item?.meta.date).locale(locale).format("D MMMM YYYY")}
            </Muted>
            <AuthorGroup authors={item.meta.authors} />
          </CardFooter>
        ) : null}
      </Card>
    </CardLink>
  );
};

const ItemContainer = styled(Col)`
  display: flex;
  flex-direction: column;
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

  const grid = (items || placeholder).map((item, index) => {
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

  return containerless ? <>{grid}</> : <Base>{grid}</Base>;
};
