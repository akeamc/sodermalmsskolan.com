import { Tags } from "@tryghost/content-api";
import api from "./credentials";

export async function getTags(): Promise<Tags> {
  const tags: Tags = await api.tags.browse({
    limit: "all",
  });
  return tags;
}
