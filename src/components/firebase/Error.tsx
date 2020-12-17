import { FirebaseError } from "firebase-admin";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { loginLink, resetAccountLink, signupLink } from "../../lib/auth/href";

/**
 * Human-readable `FirebaseError` view.
 */
const FancyFirebaseError: FunctionComponent<{error: FirebaseError}> = ({ error }) => {
  switch (error.code) {
    case "auth/invalid-email":
      return <>E-postadressen är ogiltig.</>;
    case "auth/user-not-found":
      return (
        <>
          Ingen användare med e-postadressen hittades. Vill du
          {" "}
          <Link href={signupLink()} passHref>
            <a>skapa ett konto</a>
          </Link>
          ?
        </>
      );
    case "auth/wrong-password":
      return (
        <>
          Felaktigt lösenord. Har du
          {" "}
          <Link href={resetAccountLink()} passHref>
            <a>glömt lösenordet</a>
          </Link>
          ?
        </>
      );
    case "auth/weak-password":
      return <>Lösenordet måste vara minst 6 tecken långt.</>;
    case "auth/email-already-in-use":
      return (
        <>
          E-postadressen används redan av ett annat konto. Vill du
          {" "}
          <Link href={loginLink()} passHref>
            <a>logga in</a>
          </Link>
          ?
        </>
      );
    case "auth/invalid-action-code":
      return <>Länken är ogiltig eller har redan använts.</>;
    default:
      return <>{error.message}</>;
  }
};

export default FancyFirebaseError;
