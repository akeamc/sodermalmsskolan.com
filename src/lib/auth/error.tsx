import { FirebaseError } from "firebase-admin";
import Link from "next/link";
import React from "react";
import { Anchor } from "../../components/basic/Typography";
import { loginLink, resetAccountLink, signupLink } from "./href";

export const readableErrorMessage = (error: FirebaseError): React.ReactNode => {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-postadressen är ogiltig.";
    case "auth/user-not-found":
      return (
        <>
          Ingen användare med e-postadressen hittades. Vill du{" "}
          <Link href={signupLink()} passHref>
            <Anchor>skapa ett konto</Anchor>
          </Link>
          ?
        </>
      );
    case "auth/wrong-password":
      return (
        <>
          Felaktigt lösenord. Har du{" "}
          <Link href={resetAccountLink()} passHref>
            <Anchor>glömt lösenordet</Anchor>
          </Link>
          ?
        </>
      );
    case "auth/weak-password":
      return "Lösenordet måste vara minst 6 tecken långt.";
    case "auth/email-already-in-use":
      return (
        <>
          E-postadressen används redan av ett annat konto. Vill du{" "}
          <Link href={loginLink()} passHref>
            <Anchor>logga in</Anchor>
          </Link>
          ?
        </>
      );
    case "auth/invalid-action-code":
      return "Länken är ogiltig eller har redan använts.";
    default:
      return error.message;
  }
};
