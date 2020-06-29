import React from "react";
import { GenericUser } from "../../lib/models/User";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function getLineClamp(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

export interface GridItem {
  title: string;
  description: string;
  image?: string;
  meta?: {
    authors: GenericUser[];
    date: Date;
  };
  url: string;
}

class CardGridItem extends React.Component<{
  item: GridItem | null;
  imageExpected: boolean;
  loading: boolean;
  lineClamp: number | null;
}> {
  render() {
    const { item, imageExpected, loading, lineClamp } = this.props;
    const excerptRows = 3;

    return (
      <NarrowCard
        meta={item?.meta}
        image={item?.image}
        href={item?.url}
        loading={loading}
        imageExpected={imageExpected}
      >
        <h3>{loading ? <Skeleton /> : item?.title}</h3>
        <p
          className="mb-0 text-muted"
          style={lineClamp ? getLineClamp(lineClamp) : {}}
        >
          {loading ? <Skeleton count={excerptRows} /> : item.description}
        </p>
      </NarrowCard>
    );
  }
}

export const CardGrid: React.FunctionComponent<{
  items: GridItem[];
  imagesExpected: boolean;
  expectedNumberOfItems?: number;
  rowLimit?: number | null;
  containerLess?: boolean;
}> = (props) => {
  const {
    items,
    imagesExpected = true,
    expectedNumberOfItems = 3,
    rowLimit = null,
    containerLess = false,
  } = props;
  const placeholder = new Array<GridItem>(expectedNumberOfItems).fill(null);

  let grid = (items || placeholder).map((item, index) => {
    return (
      <Col xs={12} md={6} lg={4} key={index} className="d-flex">
        <CardGridItem
          item={item}
          loading={!items}
          imageExpected={imagesExpected}
          lineClamp={rowLimit}
        />
      </Col>
    );
  });

  return containerLess ? <>{grid}</> : <Row>{grid}</Row>;
};
