import React, { FunctionComponent } from "react";
import Letter from "../../lib/news/structures/shared/letter";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface LetterCardProps {
  letter: Letter;
  rows?: number;
}

const LetterCard: FunctionComponent<LetterCardProps> = ({ letter, rows = 5 }) => (
  <Card href={letter?.url}>
    <CardTitle>{letter?.title || <InlineSkeleton />}</CardTitle>
    <CardDescription css={{
      display: "-webkit-box",
      WebkitLineClamp: rows,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      position: "relative",

      "&::before": {
        display: letter?.attachment?.content ? "block" : "none",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: "\"\"",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), var(--color-bg-primary))",
        pointerEvents: "none",
      },
    }}
    >
      {letter?.attachment?.content || <InlineSkeleton count={rows} />}
    </CardDescription>
  </Card>
);

export default LetterCard;
