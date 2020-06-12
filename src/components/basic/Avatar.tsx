import React from "react";
import { AutoLink } from "./AutoLink";
import { Author } from "../../api/ghost/posts";

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
  authors: Author[];
  size?: string;
  className?: string;
}> {
  render() {
    const { authors, size, className = "" } = this.props;

    return (
      <div
        className={`avatar-group ${
          size ? `avatar-group-${size}` : ""
        } ${className}`}
      >
        {authors.map((author, index) => (
          <Avatar
            key={index}
            size={size}
            href={author.url}
            imageUrl={author.profile_image}
          />
        ))}
      </div>
    );
  }
}
