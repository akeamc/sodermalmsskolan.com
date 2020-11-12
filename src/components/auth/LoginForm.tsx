import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ArrowRight } from "react-feather";
import { readableErrorMessage } from "../../lib/auth/error";
import { auth } from "../../lib/firebase/firebase";
import { sendLoginSuccessToast } from "../../providers/Auth";
import { Button } from "../basic/Button";
import { Input } from "../form/Input";

export const LoginForm: React.FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<React.ReactNode>("");
  const router = useRouter();

  const continueUrl = router.query.redirect?.toString() || "/konto";

  const [isLoading, setLoading] = useState<boolean>(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("Loggar in ...");
    setLoading(true);

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        sendLoginSuccessToast(email);
        setMessage("Inloggad!");
        router.push(continueUrl);
      })
      .catch((error) => {
        setMessage(readableErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={submit}>
      <Input
        disabled={isLoading}
        type="email"
        name="email"
        placeholder="E-post"
        ref={emailRef}
        required
      />
      <Input
        disabled={isLoading}
        type="password"
        name="password"
        placeholder="Lösenord"
        ref={passwordRef}
        required
      />
      <p>{message}</p>
      <Button icon={<ArrowRight />}>Logga in</Button>
    </form>
  );
};
