import Link from "next/link";
import React, { FunctionComponent } from "react";
import Base from "../Base";
import Card from "../Card";
import LogoIcon from "../logo/Icon";
import { SmallHeading } from "../text/headings";

export interface AuthFormPageProps {
  title: string;
}

const AuthFormPage: FunctionComponent<AuthFormPageProps> = ({
  title,
  children,
}) => (
  <Base navbar={false} footer={false}>
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
          padding: "2rem",
          width: "30rem",
          position: "relative",
          zIndex: 1,
          backgroundColor: "var(--color-bg-primary)",
          borderRadius: "0.3125rem",
        }}
        >
          <div css={{
            textAlign: "center",
          }}
          >
            <SmallHeading>{title}</SmallHeading>
          </div>
          <div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  </Base>
);

export default AuthFormPage;
