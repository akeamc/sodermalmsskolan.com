import React, { FunctionComponent } from "react";
import { Field } from "../../lib/digibruh/Field";
import { Emoji } from "../basic/Emoji";
import Card from "../card";

export const FieldCard: FunctionComponent<{ field: Field }> = ({ field }) => {
  return (
    <Card
      body={{
        title: field.name,
        description: field.description ? (
          <Emoji>{field.description}</Emoji>
        ) : null,
        background: field.coverImage,
        expectsBackground: !!field.coverImage,
      }}
      href={field.url}
    />
  );
};
