import api from "./credentials";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string;
  visibility: string;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
}

export async function getTags(): Promise<Tag[]> {
  const tags: Tag[] = await api.tags.browse({
    limit: "all",
  });
  return tags;
}
