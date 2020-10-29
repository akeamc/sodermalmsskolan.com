import { Base } from "../../grid/Base";
import {
  SocialIcon,
  SocialMedia,
  SocialProfile,
} from "../../basic/SocialIcons";
import { MinecraftStatusBadge } from "../../minecraft/StatusBadge";
import styled from "styled-components";
import { UnstyledList } from "../../basic/List";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { Muted } from "../../basic/Typography";

const BottomSection = styled.div`
  grid-column: span 12;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Attribution = styled(Muted)`
  margin: 0;
  font-size: 0.875rem;
`;

const FooterSocialProfile = styled.li`
  &:not(:last-child) {
    margin-right: 15px;
    padding-right: 15px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }

  float: left;
`;

const SocialLink = styled.a`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease;

  svg {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const FooterSocial: React.FunctionComponent<{
  profiles: SocialProfile[];
}> = ({ profiles }) => {
  return (
    <UnstyledList>
      {profiles.map((profile, index) => (
        <FooterSocialProfile key={index}>
          <SocialLink href={profile.url}>
            <SocialIcon socialMedia={profile.socialMedia} />
          </SocialLink>
        </FooterSocialProfile>
      ))}
    </UnstyledList>
  );
};

export const DISCORD_INVITE = "https://discord.gg/4hEnTpd";

export const socialProfiles: SocialProfile[] = [
  {
    socialMedia: SocialMedia.Discord,
    url: DISCORD_INVITE,
  },
  {
    socialMedia: SocialMedia.Instagram,
    url: "https://www.instagram.com/sodermalmsskolan.c0m/",
  },
];

export const FooterBottom: React.FunctionComponent = () => {
  return (
    <Base>
      <BottomSection>
        <Attribution>Designed by Lynx in Norrland.</Attribution>
        <FooterSocial profiles={socialProfiles} />
        <div>
          <MinecraftStatusBadge />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </BottomSection>
    </Base>
  );
};
