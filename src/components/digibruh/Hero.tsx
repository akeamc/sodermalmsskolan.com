import { LeadText } from "../basic/Typography";
import { HeaderWithBackground } from "../layout/Header";
import React from "react";
import { Emoji } from "../basic/Emoji";
import { HeroTitle } from "../layout/Hero";
import { Skeleton } from "../basic/Skeleton";

export interface HeroProps {
  title: string;
  lead?: string;
  image: string;
}

export const DigibruhHero: React.FunctionComponent<HeroProps> = ({
  title,
  lead,
  image,
}) => {
  return (
    <HeaderWithBackground image={image}>
      <HeroTitle>{title || <Skeleton />}</HeroTitle>
      <LeadText>
        <Emoji>{typeof lead === "string" ? lead : <Skeleton count={4} />}</Emoji>
      </LeadText>
    </HeaderWithBackground>
  );
};
