import React from "react";
import { AutoLink } from "./AutoLink";

export class Avatar extends React.Component<{
  href?: string;
  imageUrl: string;
  size?: string;
  className?: string;
}> {
  render() {
    const { href = "#", imageUrl, size, className } = this.props;

    return (
      <AutoLink
        href={href}
        className={`avatar ${size ? `avatar-${size}` : ""} ${className}`}
      >
        <img src={imageUrl} className="avatar-img rounded-circle" />
      </AutoLink>
    );
  }
}
