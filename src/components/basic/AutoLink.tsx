import React from "react";
import Link from "next/link";

export class AutoLink extends React.Component<{
  href: string;
  children?: JSX.Element | JSX.Element[] | string | (JSX.Element | string)[];
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
}> {
  render() {
    const { href, children, style, block } = this.props;
    const isExternal = href.indexOf("//") > -1;

    const className = `${this.props.className} ${
      block ? "text-reset text-decoration-none d-block" : ""
    }`;

    return isExternal ? (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    ) : (
      <Link href={href}>
        <a className={className} style={style}>
          {children}
        </a>
      </Link>
    );
  }
}
