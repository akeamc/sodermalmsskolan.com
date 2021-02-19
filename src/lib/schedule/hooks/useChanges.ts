import { DISCORD_CHANNELS } from "../../discord/constants";
import useChannelMessages from "../../discord/hooks/useChannelMessages";
import ScheduleChange, { parseMessageContent } from "../ScheduleChange";

/**
 * Use changes in the schedule, with Discord as the source.
 *
 * @returns {ScheduleChange[]} The schedule changes.
 */
const useChanges = (): ScheduleChange[] => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.schedule.id,
    pageSize: 100,
  });

  return data?.flat()?.map(({ content }) => parseMessageContent(content));
};

export default useChanges;
