import api from "./credentials";
import { Tags } from "@tryghost/content-api";

export async function getTags(): Promise<Tags> {
  const tags: Tags = await api.tags.browse({
    limit: "all",
  });
  return tags;
}
