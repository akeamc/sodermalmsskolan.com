import { User } from "./Discord";

export interface StudySet {
  timestamp: Date;
  author: User;
  url: string;
  name: string;
  categories: string[];
  count: number;
}
