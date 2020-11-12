import { AuthActionProps } from ".";
import React, { useEffect, useRef, useState } from "react";
import { FormWrapper } from "../FormWrapper";
import { auth } from "../../../lib/firebase/firebase";
import { useRouter } from "next/router";
import { FullPageText } from "../../basic/Typography";
import { FullPageSpinner } from "../../basic/Spinner";
import { readableErrorMessage } from "../../../lib/auth/error";
import { Input } from "../../form/Input";
import { Button } from "../../basic/Button";
import { ArrowRight } from "react-feather";
import { sendLoginSuccessToast } from "../../../providers/Auth";

const PasswordResetForm: React.FunctionComponent<{
  oobCode: string;
  accountEmail: string;
  continueUrl: string;
}> = ({ oobCode, accountEmail, continueUrl }) => {
  const passwordRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<React.ReactNode>("");
  const [isLoading, setLoading] = useState<boolean>();
  const router = useRouter();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("Återställer lösenord ...");

    const password = passwordRef.current.value;

    auth
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        setMessage("Loggar in ...");

        auth.signInWithEmailAndPassword(accountEmail, password).then(() => {
          sendLoginSuccessToast(accountEmail);
          setMessage("Inloggad!");
          router.push(continueUrl);
        });
      })
      .catch((error) => {
        setLoading(false);
        setMessage(readableErrorMessage(error));
      });
  };

  return (
    <FormWrapper
      headline="Byt lösenord"
      sub={
        <>
          Välj ett nytt lösenord för <code>{accountEmail}</code>.
        </>
      }
      backButton={false}
    >
      <form onSubmit={submit}>
        <Input
          disabled={isLoading}
          type="password"
          name="password"
          placeholder="Lösenord"
          ref={passwordRef}
          required
        />
        <p>{message}</p>
        <Button icon={<ArrowRight />}>Byt lösenord</Button>
      </form>
    </FormWrapper>
  );
};

export const ResetPassword: React.FunctionComponent<AuthActionProps> = ({
  oobCode,
  continueUrl,
}) => {
  const [message, setMessage] = useState<React.ReactNode>();
  const [accountEmail, setAccountEmail] = useState<string>();

  useEffect(() => {
    auth
      .verifyPasswordResetCode(oobCode)
      .then(setAccountEmail)
      .catch((error) => {
        console.error(error);
        setMessage(readableErrorMessage(error));
      });
  }, [oobCode, continueUrl]);

  if (accountEmail) {
    return (
      <PasswordResetForm
        oobCode={oobCode}
        continueUrl={continueUrl}
        accountEmail={accountEmail}
      />
    );
  } else if (message) {
    return <FullPageText>{message}</FullPageText>;
  }

  return <FullPageSpinner />;
};
