import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { FunctionComponent, useMemo } from "react";
import { transparentize } from "polished";
import { toast } from "react-toastify";
import useLocale from "../../hooks/useLocale";
import { useAuth } from "../../lib/auth/AuthContext";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { useChannelMessages } from "../../lib/discord/structures/client/Channel";
import { auth } from "../../lib/firebase/firebase";
import { breakpoints, media } from "../../styles/breakpoints";
import UserAvatar from "./UserAvatar";
import Button from "../button/Button";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import Emphasis from "../text/atomics/Emphasis";
import { SectionHeading } from "../text/headings";
import { WarningParagraph } from "../text/paragraphs";
import EmailVerificationButton from "./EmailVerificationButton";
import { translateFirebaseError } from "../../lib/auth/forms";
import { fonts } from "../../styles/text";

/**
 * Informative card with an overview of a user's account.
 *
 * @returns {React.ReactElement} Card.
 */
const AccountCard: FunctionComponent = () => {
  const { user, reloadUser } = useAuth();
  const { language } = useLocale();
  const router = useRouter();

  const displayName = user?.displayName || <Emphasis>Namnlös</Emphasis>;

  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.photos.id,
    pageSize: 100,
  });

  const photoUrls: string[] = useMemo(() => data?.flat()
    ?.reduce((urls, message) => urls
      .concat(message.attachments.map((attachment) => attachment.url)), []), [data]);

  return (
    <Card css={{
      [media(breakpoints.small)]: {
        "--card-padding-x": "2rem",
        "--card-padding-y": "4rem",
      },
    }}
    >
      <div
        css={{
          [media(breakpoints.small)]: {
            display: "flex",
          },
        }}
      >
        <UserAvatar
          css={{
            "--avatar-size": "4rem",
            height: "var(--avatar-size)",
            marginBottom: "2rem",
            cursor: "pointer",

            [media(breakpoints.small)]: {
              marginRight: "2rem",
              marginBottom: 0,
            },

            [media(breakpoints.medium)]: {
              "--avatar-size": "6rem",
              flex: "0 0 var(--avatar-size)",
            },

            "&::after": {
              color: "#ffffff",
              backgroundColor: transparentize(0.5, "#000000"),
              content: "\"Byt bild\"",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.sans,
              fontWeight: 500,
              fontSize: "0.825rem",
              transition: "opacity 0.2s",
              opacity: 0,
            },

            "&:hover": {
              "&::after": {
                opacity: 1,
              },
            },
          }}
          onClick={() => {
            if (typeof photoUrls === "undefined") {
              return;
            }

            const newAvatarUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];

            user.updateProfile({
              photoURL: newAvatarUrl,
            })
              .then(() => reloadUser())
              .then(() => {
                toast.success("Din profilbild har uppdaterats.");
              })
              .catch((error) => {
                const { message } = translateFirebaseError(error);
                toast.error(message);
              });
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
          {user && !user?.emailVerified ? (
            <WarningParagraph>
              <span css={{
                display: "block",
                marginBottom: "1rem",
              }}
              >
                Du har inte bekräftat din e-postadress.
              </span>
              <EmailVerificationButton>Skicka ett nytt mejl</EmailVerificationButton>
            </WarningParagraph>
          ) : null}
          <div css={{
            marginTop: "2rem",
          }}
          >
            <Button
              onClick={() => {
                auth.signOut();
                router.push("/");
              }}
              disabled={!user}
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
