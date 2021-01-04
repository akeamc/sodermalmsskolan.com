import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import useTime from "../../hooks/useTime";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { useChannelMessages } from "../../lib/discord/structures/client/Channel";
import { telegramFromMessage } from "../../lib/news/telegram";
import Emoji from "../Emoji";
import InlineSkeleton from "../skeleton/InlineSkeleton";

dayjs.extend(relativeTime);

const TelegramList: FunctionComponent = () => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.telegrams.id,
  });

  const telegrams = data?.flat()?.map(telegramFromMessage) || new Array(3).fill(null);
  const { language } = useLocale();
  const now = useTime(1000);

  return (
    <ul css={{
      margin: 0,
      padding: 0,
      borderTop: "1px solid var(--color-border-primary)",
    }}
    >
      {telegrams.map((telegram, index) => (
        <li
          key={telegram?.id || index}
          css={{
            padding: "0.625rem 0",
            listStyle: "none",
            display: "flex",
            fontSize: "0.875rem",
            borderBottom: "1px solid var(--color-border-primary)",
            alignItems: "center",
          }}
        >
          <p css={{
            flex: 1,
            color: "var(--color-text-secondary)",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.25,
          }}
          >
            {telegram?.content ? <Emoji>{telegram.content}</Emoji> : <InlineSkeleton count={2} />}
          </p>
          <span css={{
            marginLeft: "0.625rem",
            color: "var(--color-text-tertiary)",
          }}
          >
            {telegram?.timestamp ? dayjs(telegram.timestamp).locale(language).from(now) : <InlineSkeleton width="8em" />}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TelegramList;
