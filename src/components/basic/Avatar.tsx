import React from "react";
import { AutoLink } from "./AutoLink";
import { GenericUser } from "../../lib/models/User";

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

export class AuthorGroup extends React.Component<{
  authors: GenericUser[];
  size?: string;
  className?: string;
}> {
  render() {
    const { authors, size, className = "" } = this.props;

    return (
      <div className="avatar-group-container">
        <div
          className={`avatar-group ${
            size ? `avatar-group-${size}` : ""
          } ${className}`}
        >
          {authors.reverse().map((author, index) => (
            <Avatar
              key={index}
              size={size}
              href={author.url}
              imageUrl={author.avatarUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}
