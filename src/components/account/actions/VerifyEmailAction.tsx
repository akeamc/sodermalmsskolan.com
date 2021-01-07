import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { translateFirebaseError } from "../../../lib/auth/forms";
import { auth } from "../../../lib/firebase/firebase";
import AuthFormPage from "../../auth/AuthFormPage";
import { DangerParagraph } from "../../text/paragraphs";
import { AccountAction } from "./types";

/**
 * Component used for verifying email addresses.
 *
 * @param {import("./types").AccountActionProps} props The props.
 *
 * @returns {React.ReactElement} The render output.
 */
const VerifyEmailAction: AccountAction = ({
  oobCode,
  continueUrl,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    auth
      .applyActionCode(oobCode)
      .then(() => auth.currentUser?.getIdToken(true))
      .then(() => {
        toast.success("Din e-postadress har bekräftats.");
        router.push(continueUrl);
      })
      .catch((error) => {
        const { message } = translateFirebaseError(error);
        setErrorMessage(message);
      });
  }, [oobCode, continueUrl, router]);

  return (
    <AuthFormPage
      title="Bekräftar kod ..."
      metadata={{
        noIndex: true,
      }}
    >
      {errorMessage ? <DangerParagraph>{errorMessage}</DangerParagraph> : null}
    </AuthFormPage>
  );
};

export default VerifyEmailAction;
