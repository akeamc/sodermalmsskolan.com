import Period from "./Period";

describe("Period tests", () => {
  it("works", () => {
    const period = new Period({
      weekday: 0,
      hour: 8,
      minute: 30,
      duration: 3600,
      room: "A311",
      subjectID: "german",
    });

    expect(period.subject.name).toBe("Tyska");
    expect(period.subject.symbol).toBe("TY");

    expect(period.totalSeconds).toBe(30600);

    const schedule = period.eventSchedule();

    expect(schedule.signature()).toBe("Tyska..#ffa400.A311.216000.DTSTART;TZID=Europe/Stockholm:20200113T083000\nRRULE:UNTIL=20220201T000000;FREQ=WEEKLY");
  });
});
