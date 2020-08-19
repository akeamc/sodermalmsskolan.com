import React from "react";
import { Logo } from "../Logo";
import styled from "styled-components";
import { Row } from "../../grid/Row";
import { Col } from "../../grid/Col";
import { FooterBottom } from "./Bottom";
import { FooterLinks } from "./Links";

const FooterContainer = styled.footer`
  background: var(--accents-1);
  padding: 48px 0;
  border-top: 1px solid var(--accents-2);
`;

const FooterLogo = styled(Logo)`
  height: 16px;
`;

const LogoRow = styled(Row)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer>
      <FooterLinks />
      <LogoRow>
        <Col xs={12}>
          <FooterLogo />
        </Col>
      </LogoRow>
      <FooterBottom />
    </FooterContainer>
  );
};
