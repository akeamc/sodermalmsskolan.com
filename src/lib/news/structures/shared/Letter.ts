import { Serializable } from "../../../common/Serializable";

export interface LetterStatic {
  title: string;
  content: string;

  /**
   * ISO8601 string of the publish date.
   */
  timestamp: string;
  url: string;
}

export class Letter implements Serializable<LetterStatic> {
  title: string;
  content: string;
  timestamp: Date;
  url: string;

  constructor({ title, timestamp, content, url }: LetterStatic) {
    this.title = title;
    this.content = content;
    this.timestamp = new Date(timestamp);
    this.url = url;
  }

  public serialize(): LetterStatic {
    return {
      title: this.title,
      content: this.content,
      timestamp: this.timestamp.toISOString(),
      url: this.url,
    };
  }
}
