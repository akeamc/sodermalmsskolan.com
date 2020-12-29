import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode } from "react";
import * as Icons from "react-feather";
import { media } from "../../styles/breakpoints";
import navbarBreakpoint from "./breakpoint";
import NavbarWrapper from "./Wrapper";

const NavbarItem: FunctionComponent<{
  href: string,
  icon: ReactNode,
}> = ({
  href,
  icon,
  children,
}) => {
  const router = useRouter();

  const isActive = href === router.asPath;

  return (
    <li css={{
      listStyle: "none",
      flex: "1 1 0px",
    }}
    >
      <Link href={href} passHref>
        <a css={{
          padding: "0.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          color: isActive
            ? "var(--color-highlight)"
            : "var(--color-text-tertiary)",
          textDecoration: "none",
          transition: "all 0.2s",

          "&:hover": {
            opacity: 0.5,
          },
        }}
        >
          {icon}
          <span css={{
            fontSize: "0.8125rem",
            marginTop: "0.25rem",
            fontWeight: 500,
          }}
          >
            {children}
          </span>
        </a>
      </Link>
    </li>
  );
};

const MobileNavbar: FunctionComponent = () => (
  <NavbarWrapper css={{
    borderTop: "1px solid var(--border-color)",
    bottom: 0,

    [media(navbarBreakpoint)]: {
      display: "none",
    },
  }}
  >
    <ul css={{
      display: "flex",
      padding: 0,
      margin: 0,
      height: "100%",
    }}
    >
      <NavbarItem href="/meny" icon={<Icons.Clipboard />}>Meny</NavbarItem>
      <NavbarItem href="/blogg" icon={<Icons.Edit2 />}>Blogg</NavbarItem>
      <NavbarItem href="/schema" icon={<Icons.Calendar />}>Schema</NavbarItem>
      <NavbarItem href="/digibruh" icon={<Icons.BookOpen />}>Digibruh</NavbarItem>
      <NavbarItem href="/nyheter" icon={<Icons.FileText />}>Nyheter</NavbarItem>
    </ul>
  </NavbarWrapper>
);

export default MobileNavbar;
