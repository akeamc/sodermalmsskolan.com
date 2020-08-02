import React from "react";
import { Logo } from "./Logo";
import { SocialIcons, SocialMedia } from "./SocialIcons";
import { colors } from "../../styles/variables";
import { AutoLink } from "./AutoLink";
import { MinecraftStatusBadge } from "../minecraft/StatusBadge";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export const Footer: React.FunctionComponent = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} lg={4}>
            <Logo
              style={{
                height: "16px",
              }}
              color={colors.primary}
              className="mb-2"
            />
            <p className="text-muted">Designed by Lynx in Norrland.</p>
            <SocialIcons
              profiles={[
                {
                  url: process.env.instagramProfile,
                  socialMedia: SocialMedia.Instagram,
                },
                {
                  url: process.env.discordInvite,
                  socialMedia: SocialMedia.Discord,
                },
              ]}
            />
            <MinecraftStatusBadge className="mt-2" />
          </Col>
          <FooterSection title="Navigera">
            <FooterLink href="/">Start</FooterLink>
            <FooterLink href="/meny">Meny</FooterLink>
            <FooterLink href="/digibruh">Digibruh</FooterLink>
          </FooterSection>
          <FooterSection title="Organisationen">
            <FooterLink href="/blogg">Blogg</FooterLink>
            <FooterLink href="/om">Om oss</FooterLink>
            <FooterLink href="/investerare">Investerare</FooterLink>
          </FooterSection>
          <FooterSection title="Resurser">
            <FooterLink href="https://status.lynx.agency">
              Serverstatus
            </FooterLink>
          </FooterSection>
        </Row>
      </Container>
    </footer>
  );
};

class FooterSection extends React.Component<{
  children: JSX.Element | JSX.Element[];
  title?: string;
}> {
  render() {
    const { title, children } = this.props;
    return (
      <Col xs={6} md={4} lg={2}>
        {title ? (
          <h6 className="font-weight-bold text-uppercase font-weight-bold mb-3">
            {this.props.title}
          </h6>
        ) : null}
        <ul className="list-unstyled mb-6 mb-md-8 mb-lg-0">{children}</ul>
      </Col>
    );
  }
}

class FooterLink extends React.Component<{
  children: string;
  href: string;
}> {
  render() {
    return (
      <li className="mb-2">
        <AutoLink href={this.props.href} className="text-reset">
          {this.props.children}
        </AutoLink>
      </li>
    );
  }
}
