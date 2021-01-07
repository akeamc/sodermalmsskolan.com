import React, { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../lib/auth/AuthContext";
import { translateFirebaseError } from "../../lib/auth/forms";
import { auth } from "../../lib/firebase/firebase";
import Button, { ButtonProps } from "../button/Button";

/**
 * Send an email verification to the specified email address.
 *
 * @returns {Promise<boolean>} Whether the email was sent.
 */
export const sendEmailVerification = async (): Promise<boolean> => {
  try {
    await auth.currentUser.sendEmailVerification();

    toast((
      <>
        Ett mejl med instruktioner för att bekräfta e-postadressen har skickats till
        {" "}
        <code>{auth.currentUser.email}</code>
        .
      </>
    ));

    return true;
  } catch (error) {
    const { message } = translateFirebaseError(error);

    toast.error(message);

    return false;
  }
};

/**
 * A button used for verifying the email address of users.
 *
 * @param {ButtonProps} props Button props.
 *
 * @returns {React.ReactElement} A rendered button.
 */
const EmailVerificationButton: FunctionComponent<ButtonProps> = (props) => {
  const { user } = useAuth();
  const [isDisabled, setDisabled] = useState<boolean>(user?.emailVerified);

  return (
    <Button
      disabled={isDisabled}
      size="small"
      onClick={() => {
        setDisabled(true);

        sendEmailVerification().then((success) => {
          setDisabled(success);
        });
      }}
      {...props}
    >
      Bekräfta e-postadressen
    </Button>
  );
};

export default EmailVerificationButton;
