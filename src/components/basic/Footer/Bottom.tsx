import { Row } from "../../grid/Row";
import { SocialIcon, SocialMedia, SocialProfile } from "../SocialIcons";
import { MinecraftStatusBadge } from "../../minecraft/StatusBadge";
import styled from "styled-components";
import { UnstyledList } from "../List";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";

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

const Attribution = styled.p`
  margin: 0;
  color: var(--accents-5);
  font-size: 0.875rem;
`;

const FooterSocialProfile = styled.li`
  &:not(:last-child) {
    margin-right: 15px;
    padding-right: 15px;
    border-right: 1px solid var(--accents-2);
  }

  float: left;
`;

const SocialLink = styled.a`
  display: block;
  text-decoration: none;
  color: var(--accents-5);
  transition: color 0.2s ease;

  svg {
    display: block;
  }

  &:hover {
    color: var(--foreground);
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

export const FooterBottom: React.FunctionComponent = () => {
  return (
    <Row>
      <BottomSection>
        <Attribution>Designed by Lynx in Norrland.</Attribution>
        <FooterSocial
          profiles={[
            {
              socialMedia: SocialMedia.Discord,
              url: "https://discord.gg/4hEnTpd",
            },
            {
              socialMedia: SocialMedia.Instagram,
              url: "https://www.instagram.com/sodermalmsskolan.c0m/",
            },
          ]}
        />
        <div>
          <MinecraftStatusBadge />
        </div>
      </BottomSection>
    </Row>
  );
};
