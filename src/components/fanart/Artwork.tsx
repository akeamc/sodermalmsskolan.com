import { Artwork } from "../../utils/fanart";
import React from "react";
import styles from "./Artwork.module.scss";
import moment from "moment";
import { GridArea } from "../basic/Grid";

interface Vector2D {
  x: number;
  y: number;
}

export class ArtworkComponent extends React.Component<
  {
    artwork: Artwork;
    key: number;
  },
  { animationDelay: number }
> {
  constructor(props) {
    super(props);

    this.state = { animationDelay: Math.random() * -10 };
  }

  render() {
    const { artwork, key } = this.props;

    return (
      <GridArea spanMobile={4} spanTablet={2} spanDesktop={3}>
        <div key={key} className={styles.artwork}>
          <a className={styles.imageWrapper} href={artwork.image.url}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${artwork.image.url})`,
                animationDelay: this.state.animationDelay + "s"
              }}
            />
          </a>
          <div className={styles.content}>
            <p className={styles.details}>
              <span className={styles.creator}>{artwork.author.username}</span>
              <span className={styles.timestamp}>
                {moment(artwork.timestamp).locale("sv").format("D MMMM YYYY")}
              </span>
            </p>
          </div>
        </div>
      </GridArea>
    );
  }
}
