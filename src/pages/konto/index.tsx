import { NextPage } from "next";
import React from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { auth } from "../../lib/firebase/firebase";

const Page: NextPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>laddar ...</p>;
  }

  return user ? (
    <>
      <code>{user.uid}</code>
      <button onClick={() => auth.signOut()}>logga ut</button>
    </>
  ) : <p>inte inloggad</p>;
};

export default Page;
