import React, { FunctionComponent } from "react";
import ClientLetter, { useLetters } from "../../lib/news/structures/client/letter";
import Card from "../Card";
import CardGrid from "../grid/CardGrid";
import { CardTitle } from "../text/headings";
import LetterCard from "./LetterCard";

const LetterSection: FunctionComponent = () => {
  const { data, error } = useLetters();

  const httpCode = error?.response?.status;
  const forbidden = httpCode === 401 || httpCode === 403;

  const letters: ClientLetter[] = data || new Array(12).fill(null);

  return (
    <div css={{
      position: "relative",
    }}
    >
      <CardGrid>
        {letters
          .map((letter, index) => <LetterCard letter={letter} key={letter?.id || index} />)}
      </CardGrid>
      {forbidden ? (
        <div css={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <Card>
            <CardTitle>du måste logga in för att visa veckobreven</CardTitle>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default LetterSection;
