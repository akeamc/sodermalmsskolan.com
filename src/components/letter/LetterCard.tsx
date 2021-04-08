import React, { FunctionComponent, useMemo } from "react";
import Letter from "../../lib/news/structures/Letter";
import getLetterExcerpt from "../../lib/news/utils/getLetterExcerpt";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface LetterCardProps {
  letter: Letter;
  rows?: number;
}

/**
 * A card displaying the excerpt of a letter.
 *
 * @param {React.PropsWithChildren<LetterCardProps>} props The props.
 *
 * @returns {React.ReactElement} Rendered card.
 */
const LetterCard: FunctionComponent<LetterCardProps> = ({ letter, rows = 5 }) => {
  const content = letter?.attachment?.content;

  const { excerpt } = useMemo(() => getLetterExcerpt(content), [content]);

  return (
    <Card href={letter?.url}>
      <CardTitle>{letter?.title ?? <InlineSkeleton />}</CardTitle>
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
          backgroundImage: "linear-gradient(180deg, var(--color-bg-transparent) 0%, var(--color-bg-primary) 100%)",
          pointerEvents: "none",
        },
      }}
      >
        {excerpt || <InlineSkeleton count={rows} />}
      </CardDescription>
    </Card>
  );
};

export default LetterCard;
