import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/button/Button";
import { useAuth } from "../../lib/auth/AuthContext";
import { auth } from "../../lib/firebase/firebase";

const Page: NextPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <p>laddar ...</p>;
  }

  return user ? (
    <>
      <code>{user.uid}</code>
      <Button onClick={() => auth.signOut().then(() => router.push("/"))} type="button" primary>logga ut</Button>
    </>
  ) : <p>inte inloggad</p>;
};

export default Page;
