import { Subjects } from "./Subject";
import {
  SinglePeriod,
  PeriodGroup,
  Period,
  GroupedPeriod,
  practicalSubjects,
} from "./Period";

type Day = Period[];

export interface Schedule {
  group: string;
  days: Day[];
}

export const Schedules: Schedule[] = [
  {
    group: "O92",
    days: [
      [
        new SinglePeriod([510, 565], Subjects.Physics, "A415"),
        new SinglePeriod([575, 635], Subjects.English, "A307"),
        new SinglePeriod([665, 745], Subjects.Mathematics, "A307"),
        new SinglePeriod([795, 870], Subjects.SocialStudies, "A309"),
      ],
      [
        new SinglePeriod([490, 540], Subjects.Sports, "B501"),
        new SinglePeriod([605, 670], Subjects.SocialStudies, "A309"),
        new PeriodGroup([
          new GroupedPeriod(
            [685, 745],
            Subjects.Swedish,
            "Tidelius",
            "EV drama"
          ),
          new GroupedPeriod(
            [685, 745],
            Subjects.English,
            "A307",
            "EV engelska"
          ),
          new GroupedPeriod(
            [685, 745],
            Subjects.English,
            "A309",
            "EV engelska"
          ),
          new GroupedPeriod(
            [685, 745],
            Subjects.Mathematics,
            "A112",
            "EV matematik"
          ),
        ]),
        new SinglePeriod([790, 840], Subjects.Physics, "A311"),
        new PeriodGroup([
          new GroupedPeriod([865, 940], Subjects.Swedish, "A308", "ASVEN"),
          new GroupedPeriod([865, 940], Subjects.French, "A221", "M2FR"),
          new GroupedPeriod([865, 940], Subjects.Spanish, "A110", "M2SP"),
          new GroupedPeriod([865, 940], Subjects.Spanish, "A220", "M2SP"),
          new GroupedPeriod([865, 940], Subjects.German, "A310", "M2TY"),
        ]),
      ],
      [
        new SinglePeriod([510, 560], Subjects.English, "A307"),
        practicalSubjects({
          chemistry: [[580, 660], "O9IER"],
          hardCrafts: [[580, 660], "O9JZH"],
          softCrafts: [[580, 660], "O9LWA"],
          music: [[570, 655], "O9DKA"],
          gastronomy: [[570, 670], "O9MBE"],
        }),
        new SinglePeriod([680, 745], Subjects.Mathematics, "A307"),
        new SinglePeriod([790, 860], Subjects.Swedish, "A308"),
        new PeriodGroup([
          new GroupedPeriod([865, 940], Subjects.Swedish, "A308", "ASVEN"),
          new GroupedPeriod([865, 940], Subjects.French, "A221", "M2FR"),
          new GroupedPeriod([865, 940], Subjects.Spanish, "A110", "M2SP"),
          new GroupedPeriod([865, 940], Subjects.Spanish, "A220", "M2SP"),
          new GroupedPeriod([865, 940], Subjects.German, "A309", "M2TY"),
        ]),
      ],
      [
        practicalSubjects({
          chemistry: [[490, 570], "O9DKA"],
          hardCrafts: [[490, 570], "O9IER"],
          softCrafts: [[490, 570], "O9JZH"],
          music: [[490, 575], "O9MBE"],
          gastronomy: [[490, 580], "O9LWA"],
        }),
        practicalSubjects({
          chemistry: [[600, 680], "O9MBE"],
          hardCrafts: [[600, 680], "O9DKA"],
          softCrafts: [[600, 680], "O9IER"],
          music: [[590, 680], "O9LWA"],
          gastronomy: [[595, 680], "O9JZH"],
        }),
        new SinglePeriod([685, 750], Subjects.Swedish, "A308"),
        new SinglePeriod([785, 835], Subjects.Mathematics, "A308"),
        new SinglePeriod([860, 960], Subjects.Sports, "Forsgrenska"),
      ],
      [
        new PeriodGroup([
          new GroupedPeriod([570, 620], Subjects.Random, "A309", "O9DKA"),
          new GroupedPeriod([570, 620], Subjects.Random, "A402", "O9IER"),
          new GroupedPeriod([570, 620], Subjects.Random, "A415", "O9JZH"),
          new GroupedPeriod([570, 620], Subjects.Random, "A307", "O9LWA"),
          new GroupedPeriod([570, 620], Subjects.Random, "A308", "O9MBE"),
        ]),
        practicalSubjects({
          chemistry: [[640, 720], "O9LWA"],
          hardCrafts: [[655, 735], "O9MBE"],
          softCrafts: [[655, 735], "O9DKA"],
          music: [[640, 725], "O9JZH"],
          gastronomy: [[640, 730], "O9IER"],
        }),
        practicalSubjects({
          chemistry: [[780, 860], "O9JZH"],
          hardCrafts: [[780, 860], "O9LWA"],
          softCrafts: [[780, 860], "O9MBE"],
          music: [[780, 865], "O9IER"],
          gastronomy: [[780, 870], "O9DKA"],
        }),
        new SinglePeriod([880, 930], Subjects.SocialStudies, "A309"),
      ],
    ],
  },
];
