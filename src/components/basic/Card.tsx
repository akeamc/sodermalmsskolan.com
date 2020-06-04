import React from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Avatar } from "./Avatar";
import { AutoLink } from "./AutoLink";

interface Author {
  name: string;
  url?: string;
  avatarUrl: string;
}

interface CardMeta {
  authors?: Author[];
  date: Date;
}

export class NarrowCard extends React.Component<{
  children: JSX.Element | JSX.Element[];
  meta?: CardMeta;
  image?: string;
  href: string;
}> {
  render() {
    const { children, meta, image, href } = this.props;

    return (
      <Card className="shadow-light-lg lift lift-lg w-100 d-flex mb-6">
        {image ? (
          <AutoLink
            href={href}
            className="card-img bg-cover"
            style={{ backgroundImage: `url(${image})` }}
            block
          />
        ) : null}
        <AutoLink href={href} className="card-body" block>
          {children}
        </AutoLink>
        {meta ? (
          <div className="card-meta">
            <hr className="card-meta-divider" />
            {meta.authors ? (
              <>
                <Avatar
                  size="sm"
                  imageUrl={meta.authors[0].avatarUrl}
                  className="mr-2"
                  href={meta.authors[0].url}
                />
                <h6 className="text-uppercase text-muted mr-2 mb-0">
                  {meta.authors.map((author) => author.name).join(", ")}
                </h6>
              </>
            ) : null}
            <p className="h6 text-uppercase text-muted mb-0 ml-auto">
              <time dateTime={meta.date.toString()}>
                {moment(meta.date).locale("sv").format("d MMMM YYYY")}
              </time>
            </p>
          </div>
        ) : null}
      </Card>
    );
  }
}

export class WideCard extends React.Component<{
  badge?: string;
  children: JSX.Element | JSX.Element[];
  meta?: CardMeta;
  image: string;
  href: string;
}> {
  render() {
    const { badge = null, children, meta, image, href } = this.props;

    return (
      <Card className="card-row shadow-light-lg lift lift-lg d-flex mb-6">
        <Row className="no-gutters">
          {badge ? (
            <Col xs={12}>
              <span className="badge badge-pill badge-light badge-float badge-float-inside">
                <span className="h6 text-uppercase">{badge}</span>
              </span>
            </Col>
          ) : null}

          <AutoLink
            className="col col-12 col-md-6 order-md-2 bg-cover"
            href={href}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />

          <Col xs={12} md={6} className="order-md-1">
            <AutoLink href={href} className="card-body" block>
              {children}
            </AutoLink>
            {meta ? (
              <div className="card-meta">
                <hr className="card-meta-divider" />
                {meta.authors ? (
                  <>
                    <Avatar
                      size="sm"
                      imageUrl={meta.authors[0].avatarUrl}
                      className="mr-2"
                      href={meta.authors[0].url}
                    />
                    <h6 className="text-uppercase text-muted mr-2 mb-0">
                      {meta.authors.map((author) => author.name).join(", ")}
                    </h6>
                  </>
                ) : null}
                <p className="h6 text-uppercase text-muted mb-0 ml-auto">
                  <time dateTime={meta.date.toString()}>
                    {moment(meta.date).locale("sv").format("d MMMM YYYY")}
                  </time>
                </p>
              </div>
            ) : null}
          </Col>
        </Row>
      </Card>
    );
  }
}
