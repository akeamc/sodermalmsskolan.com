import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import useRedirectUri from "../../lib/auth/hooks/useRedirectUri";
import Base, { BaseProps } from "../Base";
import Card from "../Card";
import FormText from "../form/text/FormText";
import LogoIcon from "../logo/Icon";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SmallHeading } from "../text/headings";
import ExternalAuthProviders from "./ExternalAuthProviders";

export interface AuthFormPageProps extends BaseProps {
  title: ReactNode;
  description?: ReactNode;
  showExternalProviders?: boolean;
  prohibitAuthenticated?: boolean;
}

/**
 * A component used to display a form related to authentication.
 *
 * @param {AuthFormPageProps} props Props.
 *
 * @returns {React.ReactElement} The rendered elements.
 */
const AuthFormPage: FunctionComponent<AuthFormPageProps> = ({
  title,
  description,
  children,
  showExternalProviders = false,
  prohibitAuthenticated = false,
  ...baseProps
}) => {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const redirectUri = useRedirectUri();

  if (user && prohibitAuthenticated) {
    router.push(redirectUri);
  }

  const showLoader = (isLoading && prohibitAuthenticated);

  return (
    <Base
      navbar={false}
      footer={false}
      {...baseProps}
    >
      <div css={{
        position: "relative",
        backgroundImage: "radial-gradient(var(--accents-2) 2px, transparent 2px)",
        backgroundSize: "20px 20px",
      }}
      >
        <Link href="/" passHref>
          <a css={{
            position: "absolute",
            top: "var(--page-gutter)",
            left: "var(--page-gutter)",
            display: "flex",
          }}
          >
            <LogoIcon height="2.5rem" />
          </a>
        </Link>
        <div css={{
          padding: "var(--page-gutter)",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1480px",
          minHeight: "100vh",
        }}
        >
          <Card css={{
            "--card-padding-x": "2rem",
            "--card-padding-y": "2rem",
            width: "30rem",
            position: "relative",
            zIndex: 1,
          }}
          >
            <div css={{
              textAlign: "center",
            }}
            >
              <SmallHeading>{showLoader ? <InlineSkeleton width="10em" /> : title}</SmallHeading>
              {description ? <FormText>{description}</FormText> : null}
            </div>
            <div css={{
              opacity: showLoader ? 0 : 1,
              transition: "opacity 0.2s",
            }}
            >
              {children}
            </div>
            {showExternalProviders ? (
              <div css={{
                marginTop: "var(--card-padding-y)",
              }}
              >
                <ExternalAuthProviders />
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default AuthFormPage;
