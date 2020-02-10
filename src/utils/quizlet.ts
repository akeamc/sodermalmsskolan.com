import fetch from "isomorphic-unfetch";

export interface StudySet {
  timestamp: Date;
  author: string;
  url: string;
  name: string;
  categories: string[];
}

export interface QuizletQuery {
  category?: string;
}

export class Quizlet {
  static async fetchStudySets({ category }: QuizletQuery = {}): Promise<StudySet[]> {
    const res = await fetch(
      `https://api.xn--sdermalmsskolan-8sb.com/quizlet/${category || ""}`
    );

    if (res.status != 200) {
      throw new Error("Status code is not 200");
    }

    const data = await res.json();

    const sets: StudySet[] = data.sets.map(set => {
      return {
        timestamp: new Date(set.timestamp),
        author: set.author,
        url: set.url,
        name: set.name,
        categories: set.categories
      };
    });

    return sets;
  }
}
