import { Theme } from "@emotion/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { useTime } from "../../hooks/time";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { useChannelMessages } from "../../lib/discord/structures/client/Channel";
import { telegramFromMessage } from "../../lib/news/telegram";
import Emoji from "../Emoji";

dayjs.extend(relativeTime);

const TelegramList: FunctionComponent = () => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.telegrams.id,
  });

  const telegrams = data?.flat()?.map(telegramFromMessage);
  const lang = useLang();
  const now = useTime(1000);

  return (
    <ul css={(theme: Theme) => ({
      margin: 0,
      padding: 0,
      borderTop: `1px solid ${theme.color.border}`,
    })}
    >
      {telegrams?.map((telegram) => (
        <li
          key={telegram.id}
          css={(theme: Theme) => ({
            padding: "0.625rem 0",
            listStyle: "none",
            display: "flex",
            fontSize: "0.875rem",
            borderBottom: `1px solid ${theme.color.border}`,
            alignItems: "center",
          })}
        >
          <p css={(theme: Theme) => ({
            flex: 1,
            color: theme.color.text.secondary,
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.25,
          })}
          >
            <Emoji>{telegram.content}</Emoji>
          </p>
          <span css={(theme: Theme) => ({
            marginLeft: "0.625rem",
            color: theme.color.text.tertiary,
          })}
          >
            {dayjs(telegram.timestamp).locale(lang).from(now)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TelegramList;
