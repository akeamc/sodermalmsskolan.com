import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, FunctionComponent } from "react";
import { Calendar, IconProps, Clipboard } from "react-feather";
import styles from "./MainNavbar.module.scss";

const cx = classNames.bind(styles);

export interface NavbarItemProps {
  href: string;
  icon: ComponentType<IconProps>;
  label: string;
}

/**
 * A navbar item.
 *
 * @param {React.PropsWithChildren<NavbarItemProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered navbar item.
 */
const NavbarItem: FunctionComponent<NavbarItemProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const { asPath } = useRouter();
  const selected = asPath === href;

  return (
    <li>
      <Link href={href}>
        <a className={cx("item", { selected })}>
          <Icon className={cx("icon")} />
          <span className={cx("label")}>{label}</span>
        </a>
      </Link>
    </li>
  );
};

/**
 * The main navbar.
 *
 * @returns {React.ReactElement} The rendered navbar.
 */
const MainNavbar: FunctionComponent = () => (
  <nav className={cx("nav")}>
    <ul>
      <NavbarItem href="/kalender" icon={Calendar} label="Kalender" />
      <NavbarItem href="/meny" icon={Clipboard} label="Meny" />
    </ul>
  </nav>
);

export default MainNavbar;
