import Link from "next/link";
import React, { FunctionComponent } from "react";
import useLetters from "../../lib/news/hooks/useLetters";
import VerticalStack from "../list/VerticalStack";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import SidebarHeading from "../typography/headings/SidebarHeading";

/**
 * A widget displaying letters.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const LetterWidget: FunctionComponent = () => {
  const { data } = useLetters();
  const letters = data ?? new Array(5).fill(undefined);

  return (
    <div>
      <SidebarHeading>Veckobrev</SidebarHeading>
      <VerticalStack>
        {letters?.map((letter, index) => (
          <li key={letter?.id ?? index}>
            <Link href={letter?.url ?? ""}>
              {letter?.title ?? <InlineSkeleton />}
            </Link>
          </li>
        ))}
      </VerticalStack>
    </div>
  );
};

export default LetterWidget;
