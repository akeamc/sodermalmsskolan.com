import { DateTime } from "luxon";
import RRule, { Frequency } from "rrule";
import CalendarEventDetails from "./CalendarEventDetails";
import CalendarEventSchedule from "./CalendarEventSchedule";

describe("calendar event schedule tests", () => {
  it("evaluates correctly", () => {
    const rrule = new RRule({
      dtstart: DateTime.fromISO("2020-01-01T12:00:00").toJSDate(),
      freq: Frequency.WEEKLY,
      tzid: "Europe/Stockholm",
    });

    const details: CalendarEventDetails = {
      summary: "My event",
      duration: 5400,
      color: "#ff0000",
    };

    const schedule = new CalendarEventSchedule(rrule, details);

    const instances = schedule.evaluate(
      DateTime.fromISO("2020-04-01T00:00"),
      DateTime.fromISO("2020-05-01T00:00:00"),
    );

    expect(instances).toHaveLength(5);

    const signatures: string[] = [];

    instances.forEach((instance) => {
      expect(instance.details).toEqual(details);

      expect(signatures).not.toContain(instance.signature);
      signatures.push(instance.signature);
    });

    expect(schedule.evaluate(
      DateTime.fromISO("2019-01-01T00:00"),
      DateTime.fromISO("2019-08-01T00:00"),
    )).toHaveLength(0);
  });
});
