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
      // <GridArea spanMobile={4} spanTablet={2} spanDesktop={3}>
      //   <div key={key} className={styles.artwork}>
      //     <a className={styles.imageWrapper} href={attachment.url}>
      //       <div
      //         className={styles.image}
      //         style={{
      //           backgroundImage: `url(${attachment.url})`,
      //           animationDelay: this.state.animationDelay + "s",
      //         }}
      //       />
      //     </a>
      //     <div className={styles.content}>
      //       <p className={styles.details}>
      //         <span className={styles.creator}>{message.author.username}</span>
      //         <span className={styles.timestamp}>
      //           {moment(message.createdAt).locale("sv").format("D MMMM YYYY")}
      //         </span>
      //       </p>
      //     </div>
      //   </div>
      // </GridArea>
    );
  }
}
