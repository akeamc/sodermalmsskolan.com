import React from "react";
import { Logo } from "./Logo";
import { colors } from "../../styles/variables";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { AutoLink } from "./AutoLink";
import * as Icon from "react-feather";
import { useRouter } from "next/router";

const NavLink: React.FunctionComponent<{
  href: string;
  children: string;
}> = (props) => {
  const { href, children } = props;

  const router = useRouter();

  return (
    <li className="nav-item">
      <AutoLink
        href={href}
        className={`nav-link ${
          router.pathname == href ? "nav-link-active" : ""
        }`}
      >
        {children}
      </AutoLink>
    </li>
  );
};

const NavLinks: React.FunctionComponent = () => (
  <>
    <NavLink href="/blogg">Blogg</NavLink>
    <NavLink href="/meny">Meny</NavLink>
    <NavLink href="/digibruh">Digibruh</NavLink>
    <NavLink href="/om">Om</NavLink>
  </>
);

export class Navigation extends React.Component<
  {
    dark?: boolean;
    fixed?: boolean;
    lift?: boolean;
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
    const { dark = false, fixed = false, lift = false } = this.props;

    return (
      <div
        className={`navbar ${dark ? "navbar-dark" : "bg-white"} ${
          fixed ? "navbar-fixed" : null
        } ${lift ? "navbar-lift" : null}`}
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
            className={`d-md-none navbar-toggler collapsed ${
              this.state.showMobileNav ? "nav-shown" : ""
            }`}
            onClick={() => this.setMobileNavState(!this.state.showMobileNav)}
          >
            <Icon.Menu />
          </button>
          <div
            className={`mobile-nav d-md-none ${
              this.state.showMobileNav ? "shown" : ""
            }`}
          >
            <ul className="text-right">
              <NavLinks />
            </ul>
          </div>
          <div
            className={`mobile-nav-overlay d-md-none ${
              this.state.showMobileNav ? "shown" : ""
            }`}
          />
        </Container>
      </div>
    );
  }
}
