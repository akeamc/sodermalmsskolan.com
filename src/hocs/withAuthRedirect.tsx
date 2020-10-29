import { useRouter } from "next/router";
import { NextPage } from "next";
import React from "react";
import { useAuth } from "../providers/Auth";
import { FullPageSpinner } from "../components/basic/Spinner";
import { FullPageWrapper } from "../components/layout/Container";
import { Link } from "../components/basic/Link";
import { DISCORD_INVITE } from "../components/layout/Footer/Bottom";
import queryString from "query-string";
import { Muted } from "../components/basic/Typography";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

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

    const { isLoading, isAuthenticated, user } = useAuth();

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (isBrowser() && expectedAuth !== isAuthenticated) {
      router.push(
        queryString.stringifyUrl({
          url: "/api/auth/login",
          query: redirectBack
            ? {
                redirect: router.pathname,
              }
            : {},
        })
      );
      return <></>;
    }

    if (isBrowser() && expectedAuth !== user?.isMember) {
      return (
        <FullPageWrapper>
          <Muted>
            Du måste <Link href={DISCORD_INVITE}>gå med i Discordservern</Link>{" "}
            först.
          </Muted>
        </FullPageWrapper>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectWrapper;
}
