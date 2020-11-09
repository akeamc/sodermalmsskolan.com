import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ArrowRight } from "react-feather";
import { toast } from "react-toastify";
import { readableErrorMessage } from "../../lib/auth/error";
import { auth } from "../../lib/firebase/firebase";
import { Button } from "../basic/Button";
import { Input } from "../form/Input";

export const LoginForm: React.FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<React.ReactNode>("");
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const submit = () => {
    setMessage("Loggar in ...");
    setLoading(true);

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toast(`Inloggad som ${email}.`, { type: "success" });
        router.push("/konto");
      })
      .catch((error) => {
        setMessage(readableErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form>
      <Input
        disabled={isLoading}
        type="email"
        name="email"
        placeholder="E-post"
        ref={emailRef}
      />
      <Input
        disabled={isLoading}
        type="password"
        name="password"
        placeholder="Lösenord"
        ref={passwordRef}
      />
      <p>{message}</p>
      <Button icon={<ArrowRight />} onClick={submit}>
        Logga in
      </Button>
    </form>
  );
};
