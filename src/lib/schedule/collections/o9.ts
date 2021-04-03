import { PeriodCollection } from "../Period";

const o9: PeriodCollection[] = [{
  appliesTo: /^O9.*$/i,
  periods: [{
    weekdays: [0, 1, 2, 3, 4],
    hour: 12,
    minute: 30,
    duration: 1200,
    subject: "lunch",
  }, {
    weekdays: 3,
    hour: 14,
    minute: 20,
    duration: 6000,
    subject: "sports",
    room: "Forsgrenska",
  }],
}, {
  appliesTo: /^O9TY$/i,
  periods: [{
    weekdays: 1,
    hour: 14,
    minute: 25,
    duration: 4500,
    subject: "german",
    room: "A310",
  }, {
    weekdays: 4,
    hour: 10,
    minute: 55,
    duration: 4500,
    subject: "german",
    room: "A310",
  }],
}, {
  appliesTo: /^O9MA$/i,
  periods: [{
    weekdays: 1,
    hour: 11,
    minute: 25,
    duration: 3600,
    subject: "studentsChoice",
    room: "A112",
  }],
}, {
  appliesTo: /^O9DKA$/i,
  periods: [{
    weekdays: 4,
    hour: 9,
    minute: 30,
    duration: 3000,
    subject: "random",
    room: "A309",
  }],
}, {
  appliesTo: /^O93$/i,
  periods: [{
    weekdays: 0,
    hour: 8,
    minute: 25,
    duration: 3600,
    subject: "english",
    room: "A307",
  }, {
    weekdays: 0,
    hour: 9,
    minute: 45,
    duration: 4500,
    subject: "math",
    room: "A311",
  }, {
    weekdays: 0,
    hour: 11,
    minute: 10,
    duration: 4500,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekdays: 0,
    hour: 13,
    minute: 15,
    duration: 4200,
    subject: "swedish",
    room: "A308",
  }, {
    weekdays: 1,
    hour: 8,
    minute: 25,
    duration: 3900,
    subject: "math",
    room: "A311",
  }, {
    weekdays: 1,
    hour: 9,
    minute: 50,
    duration: 3000,
    subject: "sports",
    room: "B501",
  }, {
    weekdays: 1,
    hour: 13,
    minute: 10,
    duration: 3900,
    subject: "swedish",
    room: "A308",
  }, {
    weekdays: 2,
    hour: 8,
    minute: 20,
    duration: 3300,
    subject: "science",
    room: "A417",
  }, {
    weekdays: 2,
    hour: 9,
    minute: 25,
    duration: 3000,
    subject: "math",
    room: "A311",
  }, {
    weekdays: 2,
    hour: 10,
    minute: 20,
    duration: 3000,
    subject: "swedish",
    room: "A308",
  }, {
    weekdays: 2,
    hour: 11,
    minute: 20,
    duration: 3900,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekdays: 2,
    hour: 13,
    minute: 15,
    duration: 3000,
    subject: "english",
    room: "A307",
  }, {
    weekdays: 3,
    hour: 9,
    minute: 35,
    duration: 6000,
    subject: "engineering",
    room: "A417",
  }, {
    weekdays: 3,
    hour: 11,
    minute: 25,
    duration: 3300,
    subject: "math",
    room: "A311",
  }, {
    weekdays: 3,
    hour: 13,
    minute: 5,
    duration: 3000,
    subject: "socialStudies",
    room: "A309",
  }, {
    weekdays: 4,
    hour: 13,
    minute: 0,
    duration: 6600,
    subject: "art",
    room: "A302",
  }, {
    weekdays: 4,
    hour: 14,
    minute: 55,
    duration: 3000,
    subject: "science",
    room: "A417",
  }],
}];

export default o9;
