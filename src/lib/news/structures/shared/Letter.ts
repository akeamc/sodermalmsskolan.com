import { Serializable } from "../../../common/Serializable";

export interface LetterStatic {
  id: string;
  title: string;
  content?: string;

  /**
   * ISO8601 string of the publish date.
   */
  timestamp: string;
  url: string;
}

export class Letter implements Serializable<LetterStatic> {
  id: string;
  title: string;
  content?: string;
  timestamp: Date;
  url: string;

  constructor({ id, title, timestamp, content, url }: LetterStatic) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.timestamp = new Date(timestamp);
    this.url = url;
  }

  public serialize(): LetterStatic {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      timestamp: this.timestamp.toISOString(),
      url: this.url,
    };
  }
}
