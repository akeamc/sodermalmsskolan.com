import React from "react";
import styles from "./Artwork.module.scss";
import moment from "moment";
import { Message, Attachment } from "../../models/Discord";

export class ArtworkComponent extends React.Component<
  {
    message: Message;
    key: number;
  },
  { animationDelay: number }
> {
  constructor(props) {
    super(props);

    this.state = {
      animationDelay: Math.random() * -10,
    };
  }

  private get attachment(): Attachment {
    return this.props.message.attachments[0];
  }

  render() {
    const { message, key } = this.props;

    const attachment = this.attachment;

    return (
      <div className={styles.wrapper}>
        <div
          className={[styles.artwork, message.pinned ? styles.pinned : ""].join(
            " "
          )}
          key={key}
        >
          <img src={attachment.url} />
          <div className={styles.content}>
            <p className={styles.details}>
              <span className={styles.creator}>{message.author.username}</span>
              <span className={styles.timestamp}>
                {moment(message.createdAt).locale("sv").format("D MMMM YYYY")}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
