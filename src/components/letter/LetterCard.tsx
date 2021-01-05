import React, { FunctionComponent } from "react";
import Letter from "../../lib/news/structures/shared/letter";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface LetterCardProps {
  letter: Letter;
}

const LetterCard: FunctionComponent<LetterCardProps> = ({ letter }) => (
  <Card href={letter?.url}>
    <CardTitle>{letter?.title || <InlineSkeleton />}</CardTitle>
    <CardDescription css={{
      display: "-webkit-box",
      WebkitLineClamp: 5,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      position: "relative",

      "&::before": {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: "\"\"",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), var(--color-bg-primary))",
      },
    }}
    >
      {letter?.attachment?.content || <InlineSkeleton count={3} />}
    </CardDescription>
  </Card>
);

export default LetterCard;
