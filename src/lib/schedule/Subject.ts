export default interface Subject {
  name: string;
  symbol: string;
  color: string;
}

export type SubjectID = "math" | "science" | "english" | "socialStudies" | "sports" | "swedish" | "random" | "studentsChoice" | "german" | "french" | "spanish" | "art" | "engineering" | "lunch";

export const subjects: Record<SubjectID, Subject> = {
  math: {
    name: "Matematik",
    symbol: "MA",
    color: "#0070f3",
  },
  science: {
    name: "NO",
    symbol: "NO",
    color: "#0cce6b",
  },
  english: {
    name: "Engelska",
    symbol: "EN",
    color: "#ff4e42",
  },
  socialStudies: {
    name: "SO",
    symbol: "SO",
    color: "#222222",
  },
  sports: {
    name: "Idrott",
    symbol: "IDH",
    color: "#f0f0f0",
  },
  swedish: {
    name: "Svenska",
    symbol: "SV",
    color: "#ffd33d",
  },
  random: {
    name: "Mentorstid",
    symbol: "MT",
    color: "#f0f0f0",
  },
  studentsChoice: {
    name: "Elevens val",
    symbol: "EV",
    color: "#ff0080",
  },
  german: {
    name: "Tyska",
    symbol: "TY",
    color: "#ffa400",
  },
  french: {
    name: "Franska",
    symbol: "FR",
    color: "#ffa400",
  },
  spanish: {
    name: "Spanska",
    symbol: "SP",
    color: "#ffa400",
  },
  art: {
    name: "Bild",
    symbol: "BL",
    color: "#6f42c1",
  },
  engineering: {
    name: "Teknik",
    symbol: "TK",
    color: "#0cce6b",
  },
  lunch: {
    name: "Lunch",
    symbol: "LU",
    color: "#f0f0f0",
  },
};
