import React from "react";
import { Logo } from "./Logo";
import { colors } from "../../styles/variables";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { AutoLink } from "./AutoLink";

export class Navigation extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Container>
          <Link href="/">
            <a className="brand-link">
              <Logo color={colors.primary} className="logo" />
            </a>
          </Link>
          <ul className="nav">
            <NavLink url="https://xn--sdermalmsskolan-8sb.com/blogg">
              Blogg
            </NavLink>
            <NavLink url="/meny">Meny</NavLink>
            <NavLink url="/quizlet">Quizlet</NavLink>
          </ul>
        </Container>
      </div>
    );
  }
}

class NavLink extends React.Component<{
  url: string;
  children: string;
}> {
  render() {
    const { url, children } = this.props;
    return (
      <li className="nav-item">
        <AutoLink href={url} className="nav-link">
          {children}
        </AutoLink>
      </li>
    );
  }
}
