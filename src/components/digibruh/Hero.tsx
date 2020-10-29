import { LeadText } from "../basic/Typography";
import { HeaderWithBackground } from "../layout/Header";
import React from "react";
import { Emoji } from "../basic/Emoji";
import { HeroTitle } from "../layout/Hero";

export interface HeroProps {
  title: string;
  lead: string;
  image: string;
}

export const DigibruhHero: React.FunctionComponent<HeroProps> = ({
  title,
  lead,
  image,
}) => {
  return (
    <HeaderWithBackground image={image}>
      <HeroTitle>{title}</HeroTitle>
      <LeadText>
        <Emoji>{lead}</Emoji>
      </LeadText>
    </HeaderWithBackground>
  );
};
