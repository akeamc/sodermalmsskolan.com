import styled from "styled-components";
import { NormalWidth } from "./Col";
import { LeadText } from "../basic/Typography";
import { ButtonRow } from "../basic/Button";

export const TitleContainer = styled(NormalWidth)`
  text-align: center;

  h1 {
    --size-lg: 4.5rem;
    --size-md: 4rem;
    --size-sm: 2.5rem;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      margin-bottom: 56px;
    }
  }

  ${LeadText} {
    margin-top: 24px;

    @media (min-width: 768px) {
      margin-top: 48px;
    }
  }

  ${ButtonRow} {
    margin: 8px 0;
  }
`;
