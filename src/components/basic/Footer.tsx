import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";
import { SocialIcons, SocialMedia } from "./SocialIcons";
import { colors } from "../../styles/variables";
import { AutoLink } from "./AutoLink";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="py-8 py-md-11 bg-gray-200">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
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
                    url: "https://www.instagram.com/sodermalmsskolan.c0m/",
                    socialMedia: SocialMedia.Instagram,
                  },
                  {
                    url: "https://discord.gg/4hEnTpd",
                    socialMedia: SocialMedia.Discord,
                  },
                ]}
              ></SocialIcons>
            </div>
            <FooterSection title="Navigera">
              <FooterLink href="/">Start</FooterLink>
              <FooterLink href="/meny">Meny</FooterLink>
              <FooterLink href="/quizlet">Quizlet</FooterLink>
            </FooterSection>
            <FooterSection title="Organisationen">
              <FooterLink href="/blogg">Blogg</FooterLink>
              <FooterLink href="/om">Om oss</FooterLink>
              <FooterLink href="/donationer">Donationer</FooterLink>
            </FooterSection>
            <FooterSection title="Resurser">
              <FooterLink href="https://status.lynx.agency">
                Serverstatus
              </FooterLink>
            </FooterSection>
          </div>
        </div>
      </footer>
    );
  }
}

class FooterSection extends React.Component<{
  children: JSX.Element | JSX.Element[];
  title?: string;
}> {
  render() {
    const { title, children } = this.props;
    return (
      <div className="col-6 col-md-4 col-lg-2">
        {title ? (
          <h6 className="font-weight-bold text-uppercase font-weight-bold mb-3">
            {this.props.title}
          </h6>
        ) : null}
        <ul className="list-unstyled mb-6 mb-md-8 mb-lg-0">{children}</ul>
      </div>
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
