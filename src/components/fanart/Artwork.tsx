import { Artwork } from "../../utils/fanart";
import React from "react";
import styles from "./Artwork.module.scss";
import moment from "moment";

export class ArtworkComponent extends React.Component<{
  artwork: Artwork;
  key: number;
}> {
  render() {
    const { artwork, key } = this.props;

    return (
      <div key={key} className={styles.artwork}>
        <a className={styles.imageWrapper} href={artwork.image.url}>
          <img src={artwork.image.url} />
        </a>
        <div className={styles.content}>
        <p className={styles.title}>{artwork.title}</p>
        <p className={styles.details}>
          <span className={styles.creator}>{artwork.author.username}</span>
          <span className={styles.timestamp}>
            {moment(artwork.timestamp)
              .locale("sv")
              .format("D MMMM YYYY")}
          </span>
        </p>
        </div>
      </div>
    );
  }
}
