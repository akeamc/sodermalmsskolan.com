import Link from "next/link";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { HTMLElementProps } from "../../styles/types/overrides";
import { skeletonBackground } from "../skeleton/Skeleton";

export const fallbackAvatarUrl = "https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg";

export interface UserAvatarProps extends HTMLElementProps<HTMLAnchorElement> {
  href?: string;
}

/**
 * A component displaying the logged in user's avatar.
 *
 * @param {React.PropsWithChildren<UserAvatarProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered avatar.
 */
const UserAvatar: FunctionComponent<UserAvatarProps> = ({ href, ...props }) => {
  const { user, isLoading } = useAuth();

  let src: string;

  if (!isLoading && typeof user?.uid !== "undefined") {
    if (typeof user?.photoURL === "string") {
      src = user?.photoURL;
    } else {
      src = fallbackAvatarUrl;
    }
  }

  const inner = (
    <a
      css={[skeletonBackground, {
        "--avatar-size": "2rem",
        position: "relative",
        width: "var(--avatar-size)",
        height: "var(--avatar-size)",
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-block",
      }]}
      {...props}
    >
      {src ? (
        <img
          src={src}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="Profilbild"
        />
      ) : null}
    </a>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {inner}
      </Link>
    );
  }

  return inner;
};

export default UserAvatar;
