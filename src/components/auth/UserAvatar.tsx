import Link from "next/link";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { skeletonBackground } from "../skeleton/Skeleton";

export const fallbackAvatarUrl = "https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg";

export interface UserAvatarProps {
  href?: string;
}

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ href, ...props }) => {
  const { user, isLoading } = useAuth();

  const src = isLoading ? user?.photoURL : fallbackAvatarUrl;

  const inner = (
    <a
      css={[skeletonBackground, {
        position: "relative",
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        overflow: "hidden",
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
