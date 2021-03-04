import { parseHumanReadableDuration } from "../calendar/utils/humanReadable";
import ScheduleChange, { parseMessageContent, parseTimeChange, TimeChange } from "./ScheduleChange";

describe("ScheduleChange tests", () => {
  it("parses time changes correctly", () => {
    expect(parseTimeChange("C")).toEqual<TimeChange>({
      canceled: true,
    });

    expect(parseTimeChange("12:30-13:10")).toEqual<TimeChange>({
      canceled: false,
      newStart: 45000,
      newEnd: 47400,
    });

    expect(parseTimeChange("00:30-")).toEqual<TimeChange>({
      canceled: false,
      newStart: 1800,
    });

    expect(parseTimeChange("-17:20")).toEqual<TimeChange>({
      canceled: false,
      newEnd: 62400,
    });

    expect(parseTimeChange("-")).toEqual<TimeChange>({
      canceled: false,
    });
  });

  it("parses messages correctly", () => {
    expect(parseMessageContent("A901B-0T00:30 00:20- ingen vikarie")).toEqual<ScheduleChange>({
      periodId: "A901B-0T00:30",
      note: "ingen vikarie",
      canceled: false,
      newStart: 1200,
    });

    expect(parseMessageContent("A901C-3T23:45:30 -23:50:45")).toEqual<ScheduleChange>({
      periodId: "A901C-3T23:45:30",
      newEnd: 85845,
      canceled: false,
    });
  });
});
