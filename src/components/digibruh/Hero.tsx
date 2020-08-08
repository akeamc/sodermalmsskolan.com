import { LeadText } from "../basic/Typography";
import { HeaderWithBackground } from "../layout/Header";

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
      <h1>{title}</h1>
      <LeadText>{lead}</LeadText>
    </HeaderWithBackground>
  );
};
