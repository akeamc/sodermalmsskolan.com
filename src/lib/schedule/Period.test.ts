import Period, { getPeriodEventSchedules } from "./Period";

describe("Period tests", () => {
  it("works", () => {
    const period: Period = {
      weekdays: 0,
      hour: 8,
      minute: 25,
      duration: 3600,
      subject: "english",
      room: "A307",
    };

    const schedule = getPeriodEventSchedules(period)[0];

    expect(schedule.signature()).toMatchInlineSnapshot(`
      "Engelska..#ff4e42.A307.3600.DTSTART;TZID=Europe/Stockholm:20200113T082500
      RRULE:UNTIL=20220201T000000;FREQ=WEEKLY"
    `);
  });
});
