import { Author } from "@tryghost/content-api";
import { getAuthorUrl } from "../ghost/author";

export interface IGenericUser {
  name: string;
  url: string | null;
  avatarUrl: string;
}

export class GenericUser implements IGenericUser {
  name: string;
  url: string | null;
  avatarUrl: string;

  constructor({ name, url, avatarUrl }: IGenericUser) {
    this.name = name;
    this.url = url;
    this.avatarUrl = avatarUrl;
  }

  static fromAuthor(author: Author): GenericUser {
    return new GenericUser({
      name: author.name,
      url: getAuthorUrl(author.slug),
      avatarUrl: author.profile_image,
    });
  }
}
