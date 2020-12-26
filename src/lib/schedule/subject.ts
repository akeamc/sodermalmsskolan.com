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
    symbol: "ID",
    color: "#6f42c1",
  },
  SWEDISH: {
    name: "Svenska",
    symbol: "SV",
    color: "#ffd33d",
  },
};
