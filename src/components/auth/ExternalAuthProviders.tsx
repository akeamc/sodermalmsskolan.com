import firebase from "firebase/app";
import React, { FunctionComponent } from "react";
import reportEvent from "../../lib/analytics/reportEvent";
import { auth } from "../../lib/firebase/firebase";
import Button from "../button/Button";

/**
 * React component used to display the various external authentication methods.
 *
 * @returns {React.ReactElement} The rendered buttons.
 */
const ExternalAuthProviders: FunctionComponent = () => (
  <Button
    onClick={() => {
      const provider = new firebase.auth.GoogleAuthProvider();

      reportEvent("login", {
        method: "google",
      });

      auth.signInWithRedirect(provider);
    }}
    size="small"
  >
    Logga in med Google
  </Button>
);

export default ExternalAuthProviders;
