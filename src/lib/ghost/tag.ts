import { Tag as GhostTag, Tags } from "@tryghost/content-api";
import api from "./credentials";
import Identification from "./identification";

/**
 * @deprecated
 */
export async function getTags(): Promise<Tags> {
  const tags: Tags = await api.tags.browse({
    limit: "all",
  });
  return tags;
}

export default interface Tag extends Identification {
  name?: string;
  description?: string;
  cover?: string;
}

export const ghostTagToTag = ({
  name,
  description,
  feature_image,
  slug,
  id,
}: GhostTag): Tag => ({
  name,
  description,
  cover: feature_image,
  slug,
  id,
});
