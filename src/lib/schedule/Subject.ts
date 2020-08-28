export interface Subject {
  name: string;
  color: string;
}

export const Subjects: { [key: string]: Subject } = {
  Mathematics: {
    name: "Matematik",
    color: "blue",
  },
  Swedish: {
    name: "Svenska",
    color: "yellow",
  },
  English: {
    name: "Engelska",
    color: "red",
  },
  History: {
    name: "Historia",
    color: "black",
  },
  SocialStudies: {
    name: "Samhällskunskap",
    color: "black",
  },
  Physics: {
    name: "Fysik",
    color: "lime",
  },
  Chemistry: {
    name: "Kemi",
    color: "lime",
  },
  Biology: {
    name: "Biologi",
    color: "lime",
  },
  Music: {
    name: "Musik",
    color: "magenta",
  },
  Gastronomy: {
    name: "Hem- och konsumentkunskap",
    color: "magenta",
  },
  Engineering: {
    name: "Teknik",
    color: "green",
  },
  HardCrafts: {
    name: "Trä- och metallslöjd",
    color: "magenta",
  },
  SoftCrafts: {
    name: "Textilslöjd",
    color: "magenta",
  },
  Sports: {
    name: "Idrott",
    color: "magenta",
  },
  German: {
    name: "Tyska",
    color: "orange",
  },
  French: {
    name: "Franska",
    color: "orange",
  },
  Spanish: {
    name: "Spanska",
    color: "orange",
  },
  Random: {
    name: "Mentorstid",
    color: "gray",
  },
};
