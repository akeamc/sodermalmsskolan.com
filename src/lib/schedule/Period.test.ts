import Period from "./Period";
import { SUBJECTS } from "./subject";

describe("Period tests", () => {
  it("converts time correctly", () => {
    const period = new Period(0, 8, 30, 60, SUBJECTS.MATH, "A901B");

    expect(period.totalMinutes).toBe(510);
    expect(period.totalSeconds).toBe(30600);

    period.totalMinutes = 90;

    expect(period.hour).toBe(1);
    expect(period.minute).toBe(30);

    period.totalSeconds = 7200;

    expect(period.hour).toBe(2);
    expect(period.minute).toBe(0);

    expect(period.first().getDay()).toBe(1);
  });

  it("generates predictable IDs", () => {
    const period = new Period(3, 8, 50, 120, SUBJECTS.GERMAN, "B501");

    expect(period.id).toBe("B501-3T8:50");
  });

  it("returns a correct description", () => {
    const period = new Period(4, 8, 30, 90, SUBJECTS.RANDOM, "A390");

    expect(period.description).toBeUndefined();

    period.deltaStart = -5;

    expect(period.description).toBe("Ny tid");

    period.canceled = true;

    expect(period.description).toBe("Inställd");

    period.note = "custom description";

    expect(period.description).toBe("custom description");
  });

  it("returns a correct ScheduledCalendarEvent", () => {
    const period = new Period(3, 13, 10, 65, SUBJECTS.ENGLISH, "B501");

    expect(period.scheduledEvent().data.color).toBe(period.subject.color);

    period.deltaStart = -10;
    period.deltaDuration = 5;

    const rescheduledEvent = period.scheduledEvent();

    expect(rescheduledEvent.data.deltaStart).toBe(-600);
    expect(rescheduledEvent.data.deltaDuration).toBe(300);
  });
});
