export default interface Subject {
  name: string;
  color: string;
}

export const SUBJECTS: Record<string, Subject> = {
  MATH: {
    name: "Matematik",
    color: "#0070f3",
  },
  SCIENCE: {
    name: "NO",
    color: "#0cce6b",
  },
  ENGLISH: {
    name: "Engelska",
    color: "#ff4e42",
  },
  SOCIAL_STUDIES: {
    name: "SO",
    color: "#888888",
  },
  SPORTS: {
    name: "Idrott",
    color: "#6f42c1",
  },
  SWEDISH: {
    name: "Svenska",
    color: "#ffd33d",
  },
};
