import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ArrowRight } from "react-feather";
import { toast } from "react-toastify";
import { readableErrorMessage } from "../../lib/auth/error";
import { auth } from "../../lib/firebase/firebase";
import { sendEmailVerification } from "../../providers/Auth";
import { Button } from "../basic/Button";
import { Input } from "../form/Input";

export const SignupForm: React.FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<React.ReactNode>("");
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const submit = () => {
    setMessage("Skapar konto ...");
    setLoading(true);

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        toast("Var hälsad. Glöm inte att bekräfta din e-postadress!", {
          autoClose: false,
          type: "success",
        });
        sendEmailVerification();
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
        Skapa konto
      </Button>
    </form>
  );
};
