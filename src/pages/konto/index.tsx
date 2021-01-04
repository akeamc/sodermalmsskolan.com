import { NextPage } from "next";
import React from "react";
import { useAuth } from "../../lib/auth/AuthContext";

const Page: NextPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>laddar ...</p>;
  }

  return user ? <code>{user.uid}</code> : <p>inte inloggad</p>;
};

export default Page;
