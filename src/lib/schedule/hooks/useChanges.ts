import { DISCORD_CHANNELS } from "../../discord/constants";
import { useChannelMessages } from "../../discord/structures/client/Channel";
import ScheduleChange, { parseMessageContent } from "../ScheduleChange";

const useChanges = (): ScheduleChange[] => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.schedule.id,
    pageSize: 100,
  });

  return data?.flat()?.map(({ content }) => parseMessageContent(content));
};

export default useChanges;
