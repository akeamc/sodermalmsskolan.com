import Link from "next/link";
import { Text } from "./Text";
import React from "react";
import styles from "./Footer.module.css";

export class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <FooterSection title="Navigera">
          <FooterLink href="/">Start</FooterLink>
          <FooterLink external href="https://södermalmsskolan.com/blogg">
            Blogg
          </FooterLink>
        </FooterSection>
        <FooterSection title="Följ oss">
          <FooterLink external href="https://discord.gg/4hEnTpd">
            Discord
          </FooterLink>
          <FooterLink
            external
            href="https://www.instagram.com/sodermalmsskolan.c0m/"
          >
            Instagram
          </FooterLink>
        </FooterSection>
      </div>
    );
  }
}

class FooterSection extends React.Component<{
  children: JSX.Element[];
  title: string;
}> {
  render() {
    return (
      <ul>
        <FooterTitle>{this.props.title}</FooterTitle>
        {this.props.children}
      </ul>
    );
  }
}

class FooterLink extends React.Component<{
  children: string;
  href: string;
  external?: boolean;
}> {
  render() {
    return (
      <li className={styles.li}>
        {this.props.external ? (
          <a href={this.props.href} className={styles.a}>
            <Text>{this.props.children}</Text>
          </a>
        ) : (
          <Link href={this.props.href}>
            <a className={styles.a}>
              <Text>{this.props.children}</Text>
            </a>
          </Link>
        )}
      </li>
    );
  }
}

class FooterTitle extends React.Component<{
  children: string;
}> {
  render() {
    return (
      <h3 className={styles.footerTitle}>
        <Text>{this.props.children}</Text>
      </h3>
    );
  }
}
