import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { loginLink, signupLink } from "../../lib/auth/href";
import Button from "../button/Button";
import UserAvatar from "../account/UserAvatar";

/**
 * Section in the navbar dedicated to authentication.
 *
 * @returns {React.ReactElement} The rendered section.
 */
const AuthNavSection: FunctionComponent = () => {
  const { user, isLoading } = useAuth();

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
      {!user && !isLoading ? (
        <>
          <Button size="small" href={loginLink()}>Logga in</Button>
          <Button primary size="small" href={signupLink()}>Skapa konto</Button>
        </>
      ) : (
        <UserAvatar href="/konto" />
      )}
    </div>
  );
};

export default AuthNavSection;
