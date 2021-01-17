import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import { useAuth } from "../../../lib/auth/AuthContext";
import { redirectUriQueryKey } from "../../../lib/auth/hooks/useRedirectUri";
import { loginLink } from "../../../lib/auth/href";
import { breakpoints, media } from "../../../styles/breakpoints";
import Base, { BaseProps } from "../../Base";
import Container from "../../Container";
import SimpleHeader from "../../header/Simple";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import Emphasis from "../../text/atomics/Emphasis";
import AccountSettingsSidebar from "./AccountSettingsSidebar";

export type AccountSettingsPageProps = BaseProps;

/**
 * A page used to change account settings.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const AccountSettingsPage: FunctionComponent<AccountSettingsPageProps> = ({
  children,
  ...baseProps
}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const initialLoading = isLoading || !user;

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(loginLink({
        [redirectUriQueryKey]: router.asPath,
      }));
    }
  }, [isLoading, router, user]);

  return (
    <Base
      {...baseProps}
      metadata={{
        noIndex: true,
        ...baseProps?.metadata,
      }}
    >
      <SimpleHeader
        title="Konto"
        sub={initialLoading ? <InlineSkeleton /> : (
          <>
            Inloggad som
            {" "}
            {user.displayName || <Emphasis>Namnlös</Emphasis>}
          </>
        )}
      />
      <Container>
        <div css={{
          display: "flex",
          position: "relative",
          flexDirection: "column",

          [media(breakpoints.medium)]: {
            flexDirection: "row",
          },
        }}
        >
          <AccountSettingsSidebar isLoading={initialLoading} />
          <div css={{
            paddingTop: "var(--page-gutter)",
            flex: "1",
          }}
          >
            <div css={{
              display: "grid",
              gridAutoColumns: "1fr",
              gap: "2rem",
            }}
            >
              {children}
            </div>
          </div>
        </div>
      </Container>
    </Base>
  );
};

export default AccountSettingsPage;
