import { DISCORD_CHANNELS } from "../../discord/constants";
import { useChannelMessages } from "../../discord/structures/client/Channel";
import ClientMessage from "../../discord/structures/client/Message";
import ScheduleChange, { parseMessage } from "../change";

const useChanges = (): ScheduleChange[] => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.schedule.id,
    pageSize: 100,
  });

  const messages: ClientMessage[] = data?.flat() || [];

  return messages.map(parseMessage);
};

export default useChanges;
