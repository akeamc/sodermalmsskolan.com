import CalendarEventSchedule from "../../calendar/event/CalendarEventSchedule";
import { getPeriodEventSchedule, PeriodCollection } from "../Period";

// TODO: Make this less messy
const collection: PeriodCollection = {
  group: "O93",
  periods: [{
    weekday: 0,
    hour: 8,
    minute: 30,
    duration: 3600,
    subject: "english",
    room: "A307",
  }, {
    weekday: 0,
    hour: 9,
    minute: 45,
    duration: 4500,
    subject: "math",
    room: "A311",
  }, {
    weekday: 0,
    hour: 11,
    minute: 10,
    duration: 4500,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekday: 0,
    hour: 13,
    minute: 15,
    duration: 4200,
    subject: "swedish",
    room: "A308",
  }, {
    weekday: 1,
    hour: 8,
    minute: 25,
    duration: 3900,
    subject: "math",
    room: "A311",
  }, {
    weekday: 1,
    hour: 9,
    minute: 50,
    duration: 3000,
    subject: "sports",
    room: "B501",
  }, {
    weekday: 1,
    hour: 13,
    minute: 10,
    duration: 3900,
    subject: "swedish",
    room: "A308",
  }, {
    weekday: 2,
    hour: 11,
    minute: 20,
    duration: 3900,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekday: 2,
    hour: 13,
    minute: 15,
    duration: 3000,
    subject: "english",
    room: "A307",
  }, {
    weekday: 3,
    hour: 9,
    minute: 35,
    duration: 6000,
    subject: "engineering",
    room: "A417",
  }, {
    weekday: 3,
    hour: 11,
    minute: 25,
    duration: 3300,
    subject: "math",
    room: "A311",
  }, {
    weekday: 3,
    hour: 13,
    minute: 5,
    duration: 3000,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekday: 4,
    hour: 13,
    minute: 0,
    duration: 6600,
    subject: "art",
    room: "A302",
  }, {
    weekday: 4,
    hour: 14,
    minute: 55,
    duration: 3000,
    subject: "science",
    room: "A417",
  }],
};

/**
 * Returns the periods.
 *
 * @returns {CalendarEventSchedule[]} The periods.
 */
const usePeriods = (): CalendarEventSchedule[] => {
  const periods = collection.periods.map(getPeriodEventSchedule);

  return periods;
};

export default usePeriods;
