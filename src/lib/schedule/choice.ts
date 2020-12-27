import PeriodCollection from "./collection";
import Period from "./period";
import { SUBJECTS } from "./subject";

export default interface PeriodChoice {
  title: string;
  id: string;
  collections: PeriodCollection[];
}

export const CHOICES: PeriodChoice[] = [
  {
    title: "Ug",
    id: "ug",
    collections: [
      new PeriodCollection("O91", [
        new Period(0, 8, 25, 70, SUBJECTS.MATH, "A307"),
        new Period(0, 9, 45, 75, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(0, 11, 15, 70, SUBJECTS.SWEDISH, "A308"),
        new Period(0, 13, 15, 55, SUBJECTS.SCIENCE, "A415"),
        new Period(1, 9, 0, 50, SUBJECTS.SPORTS, "B501"),
        new Period(1, 10, 15, 60, SUBJECTS.ENGLISH, "A307"),
        new Period(1, 13, 10, 65, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(2, 8, 15, 65, SUBJECTS.MATH, "A307"),
        new Period(2, 11, 20, 65, SUBJECTS.SWEDISH, "A308"),
        new Period(2, 13, 15, 50, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(3, 11, 30, 50, SUBJECTS.SCIENCE, "A415"),
        new Period(3, 13, 5, 50, SUBJECTS.ENGLISH, "A307"),
        new Period(4, 14, 45, 60, SUBJECTS.MATH, "A307"),
      ]), new PeriodCollection("O92", [
        new Period(0, 8, 30, 55, SUBJECTS.SCIENCE, "A415"),
        new Period(0, 9, 35, 60, SUBJECTS.ENGLISH, "A307"),
        new Period(0, 11, 5, 80, SUBJECTS.MATH, "A307"),
        new Period(0, 13, 15, 75, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(1, 8, 10, 50, SUBJECTS.SPORTS, "B501"),
        new Period(1, 10, 5, 65, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(1, 13, 10, 50, SUBJECTS.SCIENCE, "A311"),
        new Period(2, 8, 30, 50, SUBJECTS.ENGLISH, "A307"),
        new Period(2, 11, 20, 65, SUBJECTS.MATH, "A307"),
        new Period(2, 13, 10, 70, SUBJECTS.SWEDISH, "A308"),
        new Period(3, 11, 25, 65, SUBJECTS.SWEDISH, "A308"),
        new Period(3, 13, 5, 50, SUBJECTS.MATH, "A308"),
        new Period(4, 14, 40, 50, SUBJECTS.SOCIAL_STUDIES, "A309"),
      ]), new PeriodCollection("O93", [
        new Period(0, 8, 25, 60, SUBJECTS.ENGLISH, "A307"),
        new Period(0, 9, 45, 75, SUBJECTS.MATH, "A311"),
        new Period(0, 11, 10, 75, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(0, 13, 15, 70, SUBJECTS.SWEDISH, "A308"),
        new Period(1, 8, 25, 65, SUBJECTS.MATH, "A307"),
        new Period(1, 9, 50, 50, SUBJECTS.SPORTS, "B501"),
        new Period(1, 13, 10, 65, SUBJECTS.SWEDISH, "A308"),
        new Period(2, 8, 20, 55, SUBJECTS.SCIENCE, "A311"),
        new Period(2, 11, 20, 65, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(2, 13, 15, 50, SUBJECTS.ENGLISH, "A307"),
        new Period(3, 11, 30, 55, SUBJECTS.MATH, "A307"),
        new Period(3, 13, 5, 50, SUBJECTS.SOCIAL_STUDIES, "A309"),
        new Period(4, 14, 40, 50, SUBJECTS.SCIENCE, "A311"),
      ]),
    ],
  }, {
    title: "Elevens val",
    id: "free",
    collections: [
      new PeriodCollection("MA", [
        new Period(1, 11, 25, 60, SUBJECTS.STUDENTS_CHOICE, "A112"),
      ]), new PeriodCollection("DR", [
        new Period(1, 11, 25, 60, SUBJECTS.STUDENTS_CHOICE, "Tidelius"),
      ]), new PeriodCollection("EN-S", [
        new Period(1, 11, 25, 60, SUBJECTS.STUDENTS_CHOICE, "A309"),
      ]), new PeriodCollection("EN-L", [
        new Period(1, 11, 25, 60, SUBJECTS.STUDENTS_CHOICE, "A307"),
      ]),
    ],
  }, {
    title: "Språk",
    id: "lang",
    collections: [
      new PeriodCollection("TY", [
        new Period(1, 14, 25, 75, SUBJECTS.GERMAN, "A310"),
        new Period(2, 14, 25, 75, SUBJECTS.GERMAN, "A309"),
      ]), new PeriodCollection("FR", [
        new Period(1, 14, 25, 75, SUBJECTS.FRENCH, "A221"),
        new Period(2, 14, 25, 75, SUBJECTS.FRENCH, "A221"),
      ]), new PeriodCollection("SP-A", [
        new Period(1, 14, 25, 75, SUBJECTS.SPANISH, "A110"),
        new Period(2, 14, 25, 75, SUBJECTS.SPANISH, "A110"),
      ]), new PeriodCollection("SP-C", [
        new Period(1, 14, 25, 75, SUBJECTS.SPANISH, "A220"),
        new Period(2, 14, 25, 75, SUBJECTS.SPANISH, "A220"),
      ]), new PeriodCollection("ASV", [
        new Period(1, 14, 25, 75, SUBJECTS.SWEDISH, "A308"),
        new Period(2, 14, 25, 75, SUBJECTS.SWEDISH, "A308"),
      ]),
    ],
  }, {
    title: "Mentorsgrupp",
    id: "teacher",
    collections: [
      new PeriodCollection("DKA", [
        new Period(4, 9, 30, 50, SUBJECTS.RANDOM, "A309"),
      ]),
      new PeriodCollection("JZH", [
        new Period(4, 9, 30, 50, SUBJECTS.RANDOM, "A415"),
      ]),
      new PeriodCollection("MBE", [
        new Period(4, 9, 30, 50, SUBJECTS.RANDOM, "A308"),
      ]),
      new PeriodCollection("IER", [
        new Period(4, 9, 30, 50, SUBJECTS.RANDOM, "A402"),
      ]),
      new PeriodCollection("LWA", [
        new Period(4, 9, 30, 50, SUBJECTS.RANDOM, "A307"),
      ]),
    ],
  },
];

export const CHOICE_NAMES: string[] = CHOICES.reduce((names, choice) => {
  choice.collections.forEach((collection) => {
    names.push(collection.name);
  });

  return names;
}, [] as string[]);
