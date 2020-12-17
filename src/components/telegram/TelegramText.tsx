import React, { FunctionComponent } from "react";
import dayjs from "dayjs";
import Telegram from "../../lib/news/telegram";
import { useLang } from "../../hooks/lang";

const TelegramText: FunctionComponent<{telegram: Telegram}> = ({ telegram }) => {
  const lang = useLang();

  return (
    <>
      {(dayjs(telegram.timestamp).locale(lang).format("HH:mm DD MMM YYYY"))}
      {" – "}
      {telegram.content}
    </>
  );
};

export default TelegramText;
