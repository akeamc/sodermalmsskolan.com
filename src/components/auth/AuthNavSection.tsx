import React, { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../lib/auth/AuthContext";
import Button from "../button/Button";

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
        <code>
          inloggad som
          {" "}
          {user.uid}
        </code>
      ) : (
        <>
          <Button size="small">Logga in</Button>
          <Button primary size="small" onClick={() => toast("Bruh")}>Skapa konto</Button>
        </>
      )}
    </div>
  );
};

export default AuthNavSection;
