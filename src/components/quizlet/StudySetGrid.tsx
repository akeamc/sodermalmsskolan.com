import React from "react";
import { getStudySets } from "../../lib/api/main/quizlet/studysets";
import useSWR from "swr";
import { GenericUser } from "../../lib/models/User";
import { GridItem, CardGrid } from "../basic/CardGrid";

export const StudySetGrid: React.FunctionComponent = () => {
  const { data } = useSWR("/quizlet/studysets", getStudySets);
  const gridItems: GridItem[] = (data || []).map(
    ({ name, count, url, author, timestamp }) => {
      return {
        title: name,
        description: `${count} termer`,
        url,
        meta: {
          authors: [
            new GenericUser({
              name: author?.username,
              avatarUrl: author?.avatarURL,
              url: `https://quizlet.com/${author?.username}`,
            }),
          ],
          date: timestamp,
        },
      };
    }
  );

  return (
    <CardGrid
      items={gridItems}
      imagesExpected={false}
      expectedNumberOfItems={12}
    />
  );
};
