import React, { FunctionComponent } from "react";
import { useStudySets } from "../../lib/quizlet/structures/client/StudySet";
import Section, { SectionProps } from "../section/Section";
import StudySetListItem from "./StudySetListItem";

export type StudySetSectionProps = SectionProps;

/**
 * Section listing study sets.
 *
 * @param {React.PropsWithChildren<StudySetSectionProps>} props Section props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const StudySetSection: FunctionComponent<StudySetSectionProps> = ({ ...sectionProps }) => {
  const { data } = useStudySets();

  const sets = data ?? new Array(20).fill(undefined);

  return (
    <Section {...sectionProps}>
      <ul css={{
        padding: 0,
        margin: 0,
      }}
      >
        {sets
          .map((({ id } = {}, index) => (
            <StudySetListItem key={id ?? index} id={id} />
          )))}
      </ul>
    </Section>
  );
};

export default StudySetSection;
