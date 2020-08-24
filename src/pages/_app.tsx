import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
