import styled from "styled-components";
import moment from "moment";
import { AuthorGroup } from "../Avatar";
import { LinkBlock } from "../Link";
import Skeleton from "react-loading-skeleton";
import { GenericUser } from "../../../lib/models/User";
import {
  useProgressiveBackground,
  useProgressiveImage,
} from "../ProgressiveImage";

interface CardMeta {
  authors?: GenericUser[];
  date: Date;
}

export const Card = styled.div`
  background-color: var(--background);
  box-shadow: var(--shadow-small);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

export const CardHero = styled.div<{ backgroundImage?: string }>`
  min-height: 240px;
  background: var(--accents-2);
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.backgroundImage &&
    `url("${useProgressiveImage(props.backgroundImage).src}")`};
`;

export const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: 12px 24px;
  border-top: 1px solid var(--accents-2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
  }
`;

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
        <LinkBlock
          className="bg-cover card-img"
          href={href}
          style={useProgressiveBackground(image)}
        />
      ) : null}
      <LinkBlock href={href} className="card-body" block>
        {children}
      </LinkBlock>
      {meta ? (
        <div className="card-meta">
          <hr className="card-meta-divider" />
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {meta.authors ? <AuthorGroup authors={meta.authors} /> : null}
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
