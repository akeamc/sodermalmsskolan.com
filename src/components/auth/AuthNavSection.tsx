import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { loginLink, signupLink } from "../../lib/auth/href";
import Button from "../button/Button";
import UserAvatar from "../account/UserAvatar";

const AuthNavSection: FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <div css={{
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",

      "> *:not(:first-of-type)": {
        marginLeft: "1rem",
      },
    }}
    >
      {user ? (
        <UserAvatar href="/konto" />
      ) : (
        <>
          <Button size="small" href={loginLink()}>Logga in</Button>
          <Button primary size="small" href={signupLink()}>Skapa konto</Button>
        </>
      )}
    </div>
  );
};

export default AuthNavSection;
