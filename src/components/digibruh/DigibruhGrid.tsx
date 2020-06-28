import React from "react";
import { DigibruhCollection } from "../../lib/digibruh/Collection";
import { GenericUser } from "../../lib/models/User";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import { lineClamp } from "../blog/PostGrid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface IDigibruhGridItem {
  title: string;
  description: string;
  image?: string;
  meta?: {
    authors: GenericUser[];
    date: Date;
  };
  url: string;
}

class DigibruhGridItem extends React.Component<{
  item: IDigibruhGridItem | null;
  imageExpected: boolean;
  loading: boolean;
}> {
  render() {
    const { item, imageExpected, loading } = this.props;
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
        <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
          {loading ? <Skeleton count={excerptRows} /> : item.description}
        </p>
      </NarrowCard>
    );
  }
}

export const DigibruhGrid: React.FunctionComponent<{
  items: IDigibruhGridItem[];
  imagesExpected: boolean;
}> = (props) => {
  const { items, imagesExpected = true } = props;

  return (
    <Row>
      {(items || []).map((item, index) => {
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <DigibruhGridItem
              item={item}
              loading={!items}
              imageExpected={imagesExpected}
            />
          </Col>
        );
      })}
    </Row>
  );
};
