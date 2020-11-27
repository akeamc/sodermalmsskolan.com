import { Serializable } from "../../../common/Serializable";

export interface LetterAttachment {
  content: string;
  pages: number;
}

export interface LetterStatic {
  id: string;
  title: string;
  attachment?: LetterAttachment;

  /**
   * ISO8601 string of the publish date.
   */
  timestamp: string;
  url: string;
}

export class Letter implements Serializable<LetterStatic> {
  id: string;
  title: string;
  attachment?: LetterAttachment;
  timestamp: Date;
  url: string;

  constructor({ id, title, timestamp, attachment, url }: LetterStatic) {
    this.id = id;
    this.title = title;
    this.attachment = attachment;
    this.timestamp = new Date(timestamp);
    this.url = url;
  }

  public serialize(): LetterStatic {
    return {
      id: this.id,
      title: this.title,
      attachment: this.attachment,
      timestamp: this.timestamp.toISOString(),
      url: this.url,
    };
  }
}
