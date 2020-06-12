import api from "./credentials";
import { Tag } from "@tryghost/content-api";

export async function getTags(): Promise<Tag[]> {
  const tags: Tag[] = await api.tags.browse({
    limit: "all",
  });
  return tags;
}
