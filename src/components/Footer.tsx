import Link from "next/link";
import { Text } from "./Text";
import React from "react";
import styles from "./Footer.module.css";

export class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <ul>
          <FooterTitle>Navigera</FooterTitle>
          <FooterLink href="/">Start</FooterLink>
          <FooterLink href="https://södermalmsskolan.com/blogg">Blogg</FooterLink>
        </ul>
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
      <li>
        <Link href={this.props.href}>
          <a>
            <Text>{this.props.children}</Text>
          </a>
        </Link>
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
