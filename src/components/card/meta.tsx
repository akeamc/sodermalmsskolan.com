import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";

export interface MetaProps {
  date?: Date;
  authors?: string[];
}

const CardMeta: FunctionComponent<MetaProps> = ({ date, authors }) => {
  const lang = useLang();

  const prettyDate = dayjs(date).locale(lang).format("D MMMM YYYY");

  return (
    <small>
      {authors?.[0]} {date ? prettyDate : null}
    </small>
  );
};

export default CardMeta;
