import React from "react";
import Link from "next/link";

export class AutoLink extends React.Component<{
  href: string;
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  style?: React.CSSProperties;
}> {
  render() {
    const { href, children, className, style } = this.props;
    const isExternal = href.indexOf("//") > -1;

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
