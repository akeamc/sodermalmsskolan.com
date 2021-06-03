import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

/**
 * Custom 404 page that redirects back home.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const NotFound: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });

  return (
    <data value={router.asPath}>
      Omdirigerar ...
    </data>
  );
};

export default NotFound;
