import { Message } from "../discord/structures/shared/Message";

export default interface ScheduleChange {
  periodId: string;
  canceled: boolean;
  note?: string;
}

export const parseMessage = ({ content }: Message): ScheduleChange => {
  const segments = content.split(" ");

  const period = segments.shift();
  const note = segments.length > 0 ? segments.join(" ") : null;

  return {
    periodId: period,
    note,
    canceled: !note,
  };
};
