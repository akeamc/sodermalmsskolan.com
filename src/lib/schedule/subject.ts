export default interface Subject {
  name: string;
  symbol: string;
  color: string;
}

export const SUBJECTS: Record<string, Subject> = {
  MATH: {
    name: "Matematik",
    symbol: "MA",
    color: "#0070f3",
  },
  SCIENCE: {
    name: "NO",
    symbol: "NO",
    color: "#0cce6b",
  },
  ENGLISH: {
    name: "Engelska",
    symbol: "EN",
    color: "#ff4e42",
  },
  SOCIAL_STUDIES: {
    name: "SO",
    symbol: "SO",
    color: "#888888",
  },
  SPORTS: {
    name: "Idrott",
    symbol: "IDH",
    color: "#6f42c1",
  },
  SWEDISH: {
    name: "Svenska",
    symbol: "SV",
    color: "#ffd33d",
  },
  RANDOM: {
    name: "Mentorstid",
    symbol: "MT",
    color: "#000000",
  },
  STUDENTS_CHOICE: {
    name: "Elevens val",
    symbol: "EV",
    color: "#000000",
  },
  GERMAN: {
    name: "Tyska",
    symbol: "TY",
    color: "#ffa400",
  },
  FRENCH: {
    name: "Franska",
    symbol: "FR",
    color: "#ffa400",
  },
  SPANISH: {
    name: "Spanska",
    symbol: "SP",
    color: "#ffa400",
  },
  ART: {
    name: "Bild",
    symbol: "BL",
    color: "#000000",
  },
  ENGINEERING: {
    name: "Teknik",
    symbol: "TK",
    color: "#000000",
  },
};
