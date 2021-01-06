import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { useAuth } from "../../lib/auth/AuthContext";
import { auth } from "../../lib/firebase/firebase";
import { breakpoints, media } from "../../styles/breakpoints";
import UserAvatar from "../auth/UserAvatar";
import Button from "../button/Button";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import Emphasis from "../text/atomics/Emphasis";
import { SectionHeading } from "../text/headings";

/**
 *
 */
const AccountCard: FunctionComponent = () => {
  const { user } = useAuth();
  const { language } = useLocale();
  const router = useRouter();

  const displayName = user?.displayName || <Emphasis>Namnlös</Emphasis>;

  return (
    <Card css={{
      padding: "2rem",

      [media(breakpoints.medium)]: {
        padding: "4rem 2rem",
      },
    }}
    >
      <div css={{
        display: "flex",
      }}
      >
        <UserAvatar css={{
          "--avatar-size": "4rem",
          flex: "0 0 var(--avatar-size)",
          height: "var(--avatar-size)",
          marginRight: "1rem",

          [media(breakpoints.medium)]: {
            "--avatar-size": "6rem",
            marginRight: "2rem",
          },
        }}
        />
        <div css={{
          flex: 1,
          textAlign: "initial",
        }}
        >
          <SectionHeading>{user ? displayName : <InlineSkeleton width="8em" />}</SectionHeading>
          <span css={{
            display: "inline-block",
            marginTop: "1rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.25,
          }}
          >
            Senaste inloggningen:
            {" "}
            {user
              ? dayjs(user.metadata.lastSignInTime).locale(language).format("HH:mm D MMMM YYYY")
              : <InlineSkeleton width="10em" />}
          </span>
          <div css={{
            marginTop: "2rem",
          }}
          >
            <Button onClick={() => {
              auth.signOut();
              router.push("/");
            }}
            >
              Logga ut
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;
