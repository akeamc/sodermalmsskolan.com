import { DISCORD_CHANNELS } from "../../discord/constants";
import { useChannelMessages } from "../../discord/structures/client/Channel";
import ScheduleChange, { parseMessage } from "../change";

const useChanges = (): ScheduleChange[] => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.schedule.id,
    pageSize: 100,
  });

  return data?.flat()?.map(parseMessage);
};

export default useChanges;
