import React, { FunctionComponent } from "react";
import Base from "../Base";
import Card from "../Card";
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
