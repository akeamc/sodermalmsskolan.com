import { useRouter } from "next/router";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/Auth";
import { FullPageSpinner } from "../components/spinners/spinner";
import { loginLink } from "../lib/auth/href";

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param redirectBack Whether to redirect the user back to the page when the user authenticates or not.
 */
export default function withAuthRedirect<
  CP = Record<string, unknown>,
  IP = CP
>({
  WrappedComponent,
  LoadingComponent = FullPageSpinner,
  expectedAuth,
  redirectBack,
}: {
  WrappedComponent: NextPage<CP, IP>;
  LoadingComponent?: NextPage;
  expectedAuth: boolean;
  redirectBack: boolean;
}): NextPage<CP, IP> {
  const WithAuthRedirectWrapper: NextPage<CP, IP> = (props) => {
    const router = useRouter();

    const [hasMounted, setHasMounted] = useState(false);

    const { isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (hasMounted) {
      if (expectedAuth !== isAuthenticated) {
        router.push(loginLink(redirectBack ? router.pathname : undefined));

        return null;
      }
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectWrapper;
}
