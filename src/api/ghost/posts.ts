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

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image: string;
  cover_image: string;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: boolean;
  visibility: string;
  send_email_when_published: boolean;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canoncial_url: string | null;
  url: string;
  excerpt: string;
  reading_time: number;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  email_subject: string | null;
  tags: Tag[];
  authors: Author[];
  primary_tag: Tag;
  primary_author: Author;
}

export async function getPosts(limit = 10): Promise<Post[]> {
  return await api.posts.browse({
    limit,
    include: "tags,authors",
    order: "published_at DESC",
  });
}

export async function getLastFeatured(): Promise<Post> {
  const featured: Post[] = await api.posts.browse({
    filter: "featured:true",
    limit: 1,
    include: "tags,authors",
    order: "published_at DESC",
  });

  return featured[0];
}
