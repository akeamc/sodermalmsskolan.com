import React from "react";
import { Logo } from "./Logo";
import { colors } from "../../styles/variables";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { AutoLink } from "./AutoLink";
import * as Icon from "react-feather";

class NavLink extends React.Component<{
  href: string;
  children: string;
}> {
  render() {
    const { href, children } = this.props;
    return (
      <li className="nav-item">
        <AutoLink href={href} className="nav-link">
          {children}
        </AutoLink>
      </li>
    );
  }
}

const NavLinks: React.FunctionComponent = () => (
  <>
    <NavLink href="/blogg">Blogg</NavLink>
    <NavLink href="/meny">Meny</NavLink>
    <NavLink href="/quizlet">Quizlet</NavLink>
    <NavLink href="/om">Om</NavLink>
  </>
);

class MobileNavigation extends React.Component<{
  shown: boolean;
}> {
  render() {
    return (
      <>
        <div
          className={`mobile-nav d-md-none ${this.props.shown ? "shown" : ""}`}
        >
          <ul className="text-right">
            <NavLinks />
          </ul>
        </div>
        <div
          className={`mobile-nav-overlay d-md-none ${
            this.props.shown ? "shown" : ""
          }`}
        />
      </>
    );
  }
}

export class Navigation extends React.Component<
  {
    dark?: boolean;
    fixed?: boolean;
  },
  {
    showMobileNav: boolean;
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      showMobileNav: false,
    };
  }

  setMobileNavState(shown: boolean) {
    this.setState({
      showMobileNav: shown,
    });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.hideMobileNav);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.hideMobileNav);
  }

  hideMobileNav = () => {
    this.setMobileNavState(false);
  };

  render() {
    const { dark = false, fixed = false } = this.props;

    return (
      <div
        className={`navbar ${dark ? "navbar-dark" : "bg-white"} ${
          fixed ? "fixed-top" : null
        }`}
      >
        <Container>
          <Link href="/">
            <a className="brand-link">
              <Logo color={dark ? "#fff" : colors.primary} className="logo" />
            </a>
          </Link>
          <ul className="nav d-none d-md-flex">
            <NavLinks />
          </ul>
          <button
            className="d-md-none navbar-toggler collapsed"
            onClick={() => this.setMobileNavState(true)}
          >
            <Icon.Menu />
          </button>
          <MobileNavigation shown={this.state.showMobileNav} />
        </Container>
      </div>
    );
  }
}
