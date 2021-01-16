import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { useAuth } from "../../../lib/auth/AuthContext";
import { loginLink } from "../../../lib/auth/href";
import Base from "../../Base";
import Container from "../../Container";
import { SectionHeading } from "../../text/headings";
import AccountSettingsSidebar from "./AccountSettingsSidebar";

export interface AccountSettingsPageProps {
  title: ReactNode;
}

/**
 * A page used to change account settings.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const AccountSettingsPage: FunctionComponent<AccountSettingsPageProps> = ({
  children,
  title,
}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const initialLoading = isLoading || !user;

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(loginLink());
    }
  }, [isLoading, router, user]);

  return (
    <Base
      metadata={{
        noIndex: true,
      }}
    >
      <Container>
        <div css={{
          display: "flex",
          position: "relative",
        }}
        >
          <AccountSettingsSidebar isLoading={initialLoading} />
          <div css={{
            paddingTop: "var(--page-gutter)",
          }}
          >
            <SectionHeading>{title}</SectionHeading>
            <div css={{
              marginTop: "2rem",
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
