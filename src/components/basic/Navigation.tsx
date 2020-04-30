import styles from "./Navigation.module.scss";
import React from "react";
import Link from "next/link";

export class Navigation extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <ul className={styles.ul}>
          <NavLink href="/">Start</NavLink>
          <NavLink href="/meny">Meny</NavLink>
          <NavLink href="/quizlet">Quizlet</NavLink>
          <NavLink href="/fanart">Konstverk</NavLink>
        </ul>
      </div>
    );
  }
}

class NavLink extends React.Component<{
  href: string;
  external?: boolean;
  children: string;
}> {
  render() {
    return (
      <li className={styles.li}>
        {this.props.external ? (
          <a href={this.props.href} className={styles.a}>
            {this.props.children}
          </a>
        ) : (
          <Link href={this.props.href}>
            <a className={styles.a}>{this.props.children}</a>
          </Link>
        )}
      </li>
    );
  }
}
