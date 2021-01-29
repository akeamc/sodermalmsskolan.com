import { Tag as GhostTag } from "@tryghost/content-api";
import Identification from "./identification";

export default interface Tag extends Identification {
  name?: string;
  description?: string;
  cover?: string;
}

/**
 * Convert a `GhostTag` to a `Tag`.
 *
 * @param {GhostTag} tag The input tag.
 *
 * @returns {Tag} The output tag.
 */
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
