import React from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthorGroup } from "./Avatar";
import { AutoLink } from "./AutoLink";
import Skeleton from "react-loading-skeleton";
import { GenericUser } from "../../lib/models/User";
import { useProgressiveBackground } from "./ProgressiveImage";

interface CardMeta {
  authors?: GenericUser[];
  date: Date;
}

interface CardOptions {
  children: JSX.Element | JSX.Element[];
  meta?: CardMeta;
  image?: string;
  href: string;
  loading?: boolean;
  imageExpected?: boolean;
}

export const NarrowCard: React.FunctionComponent<CardOptions> = ({
  children,
  meta,
  image,
  href = "#",
  loading = false,
  imageExpected = false,
}) => {
  return (
    <Card className="shadow-light-lg lift lift-lg w-100 d-flex mb-6">
      {image || (imageExpected && loading) ? (
        <AutoLink
          className="bg-cover card-img"
          href={href}
          style={useProgressiveBackground(image)}
        />
      ) : null}
      <AutoLink href={href} className="card-body" block>
        {children}
      </AutoLink>
      {meta ? (
        <div className="card-meta">
          <hr className="card-meta-divider" />
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {meta.authors ? (
                <AuthorGroup className="mr-2" authors={meta.authors} />
              ) : null}
              <p className="h6 text-uppercase text-muted mb-0 ml-auto">
                <time dateTime={meta.date.toString()}>
                  {moment(meta.date).locale("sv").format("D MMMM YYYY")}
                </time>
              </p>
            </>
          )}
        </div>
      ) : null}
    </Card>
  );
};

export const WideCard: React.FunctionComponent<
  CardOptions & {
    badge?: string;
  }
> = ({
  children,
  meta,
  image,
  href = "#",
  loading = false,
  imageExpected = false,
  badge = null,
}) => {
  return (
    <Card className="card-row card-wide shadow-light-lg lift lift-lg d-flex mb-6">
      <Row className="no-gutters">
        {badge ? (
          <Col xs={12}>
            <span
              className="badge badge-pill badge-light badge-float badge-float-inside"
              style={{
                pointerEvents: "none",
              }}
            >
              <span className="h6 text-uppercase">{badge}</span>
            </span>
          </Col>
        ) : null}

        {image || (imageExpected && loading) ? (
          <Col xs={12} md={6} className="order-md-2 d-flex">
            <AutoLink
              className="bg-cover card-img"
              href={href}
              style={useProgressiveBackground(image)}
            />
          </Col>
        ) : null}

        <Col xs={12} md={6} className="order-md-1">
          <div className="card-content">
            <AutoLink href={href} className="card-body" block>
              {children}
            </AutoLink>
            {meta ? (
              <div className="card-meta">
                <hr className="card-meta-divider" />
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    {meta.authors ? (
                      <>
                        <AuthorGroup className="mr-2" authors={meta.authors} />
                        <h6 className="text-uppercase text-muted mr-2 mb-0">
                          {meta.authors.map((author) => author.name).join(", ")}
                        </h6>
                      </>
                    ) : null}
                    <p className="h6 text-uppercase text-muted mb-0 ml-auto">
                      <time dateTime={meta.date.toString()}>
                        {moment(meta.date).locale("sv").format("D MMMM YYYY")}
                      </time>
                    </p>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
