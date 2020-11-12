import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthActionProps } from ".";
import { readableErrorMessage } from "../../../lib/auth/error";
import { auth } from "../../../lib/firebase/firebase";
import { FullPageSpinner } from "../../basic/Spinner";
import { FullPageText } from "../../basic/Typography";

export const VerifyEmail: React.FunctionComponent<AuthActionProps> = ({
  oobCode,
  continueUrl,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState<React.ReactNode>();

  useEffect(() => {
    auth
      .applyActionCode(oobCode)
      .then(() => {
        return auth.currentUser?.getIdToken(true);
      })
      .then(() => {
        toast("Din e-postadress har verifierats.", { type: "success" });
        router.push(continueUrl);
      })
      .catch((error) => {
        console.error(error);
        setMessage(readableErrorMessage(error));
      });
  }, [oobCode, continueUrl]);

  return message ? <FullPageText>{message}</FullPageText> : <FullPageSpinner />;
};
