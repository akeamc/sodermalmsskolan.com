import styled from "styled-components";
import { Row } from "../../grid/Row";
import { AutoLink } from "../Link";
import { UnstyledList } from "../List";

const LinkSection = styled(Row)`
  margin-top: 24px;
  margin-bottom: 48px;
`;

const Column = styled.div`
  grid-column: span 6;

  @media (min-width: 768px) {
    grid-column: span 4;
  }

  @media (min-width: 992px) {
    grid-column: span 3;
  }
`;

const List = styled(UnstyledList)`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 12px 0;
  }

  a {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--accents-5);

    &:hover {
      color: var(--foreground);
    }
  }
`;

const ColumnTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--foreground);
  margin: 16px 0;
  letter-spacing: 0;
`;

export const FooterLinks: React.FunctionComponent = () => {
  return (
    <LinkSection>
      <Column>
        <ColumnTitle>Navigera</ColumnTitle>
        <List>
          <li>
            <AutoLink href="/">Start</AutoLink>
          </li>
          <li>
            <AutoLink href="/meny">Meny</AutoLink>
          </li>
          <li>
            <AutoLink href="/digibruh">Digibruh</AutoLink>
          </li>
        </List>
      </Column>
      <Column>
        <ColumnTitle>Organisationen</ColumnTitle>
        <List>
          <li>
            <AutoLink href="/blogg">Blogg</AutoLink>
          </li>
          <li>
            <AutoLink href="/om">Om oss</AutoLink>
          </li>
        </List>
      </Column>
      <Column>
        <ColumnTitle>Resurser</ColumnTitle>
        <List>
          <li>
            <AutoLink href="https://status.lynx.agency">Serverstatus</AutoLink>
          </li>
        </List>
      </Column>
    </LinkSection>
  );
};
