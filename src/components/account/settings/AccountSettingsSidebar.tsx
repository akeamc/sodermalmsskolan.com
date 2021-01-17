import Link from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, FunctionComponent } from "react";
import { Bell, User } from "react-feather";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import Skeleton from "../../skeleton/Skeleton";

interface AccountSettingsLinkProps {
  href: string,
  icon: ComponentType,
  isLoading?: boolean;
}

export interface AccountSettingsSidebarProps {
  isLoading?: boolean;
}

/**
 * Link shown in the sidebar, with a pretty icon.
 *
 * @param {React.PropsWithChildren<AccountSettingsLinkProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered link.
 */
const AccountSettingsLink: FunctionComponent<AccountSettingsLinkProps> = ({
  children,
  href,
  icon,
  isLoading = false,
}) => {
  const router = useRouter();

  const isActive = href === router.asPath;

  const Icon = isLoading ? Skeleton : icon;
  const label = isLoading ? <InlineSkeleton width="4rem" /> : children;

  return (
    <li css={{
      listStyle: "none",
    }}
    >
      <Link href={href} passHref>
        <a css={{
          color: "var(--color-text-primary)",
          textDecoration: "none",
          opacity: isActive ? 1 : 0.7,
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          padding: "var(--link-padding) 0",
        }}
        >
          <Icon css={{
            color: isActive ? "var(--color-highlight)" : "inherit",
            marginRight: "0.5rem",
            width: "1.25rem",
            height: "1.25rem",
            transition: "color 0.2s",
          }}
          />
          <span css={{
            fontSize: "0.875rem",
            fontWeight: isActive ? 700 : 400,
            transition: "font-weight 50ms",
          }}
          >
            {label}
          </span>
        </a>
      </Link>
    </li>
  );
};

/**
 * Sidebar used in account settings pages.
 *
 * @param {React.PropsWithChildren<AccountSettingsSidebarProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered sidebar.
 */
const AccountSettingsSidebar: FunctionComponent<AccountSettingsSidebarProps> = ({
  isLoading,
}) => (
  <div css={{
    "--link-padding": "0.75rem",
    "--aside-padding": "0.5rem",
    marginRight: "2rem",
    flex: "0 0 12rem",
    marginTop: "calc(var(--page-gutter) - var(--aside-padding) - var(--link-padding))",
  }}
  >
    <aside
      css={{
        position: "sticky",
        top: "var(--navbar-height)",
        paddingTop: "var(--aside-padding)",
      }}
    >
      <ul css={{
        margin: 0,
        padding: 0,
      }}
      >
        <AccountSettingsLink isLoading={isLoading} href="/konto" icon={User}>Allmänt</AccountSettingsLink>
        <AccountSettingsLink isLoading={isLoading} href="/konto/notiser" icon={Bell}>Notiser</AccountSettingsLink>
      </ul>
    </aside>
  </div>
);

export default AccountSettingsSidebar;
