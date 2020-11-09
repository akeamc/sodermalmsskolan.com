import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ArrowRight } from "react-feather";
import { toast } from "react-toastify";
import { readableErrorMessage } from "../../lib/auth/error";
import { loginLink } from "../../lib/auth/href";
import { auth } from "../../lib/firebase/firebase";
import { Button } from "../basic/Button";
import { Input } from "../form/Input";

export const ResetForm: React.FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<React.ReactNode>("");
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const submit = () => {
    setMessage("Skickar ...");
    setLoading(true);

    const email = emailRef?.current?.value;

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        router.push(loginLink());
        toast(`Instruktioner har skickats till ${email}.`);
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
      <p>{message}</p>
      <Button icon={<ArrowRight />} onClick={submit}>
        Skicka
      </Button>
    </form>
  );
};
