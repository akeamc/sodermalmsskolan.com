import { APIClient } from "../../utils/api";
import { Status } from "../../utils/status";
import { Artwork } from "../../utils/fanart";
import { Spinner } from "../basic/Spinner";
import React from "react";
import { ArtworkComponent } from "./Artwork";
import styles from "./FanartViewer.module.scss";

export class FanartViewer extends React.Component<
  {},
  { status: Status; artworks: Artwork[] }
> {
  private apiClient: APIClient;

  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      artworks: null
    };

    this.apiClient = new APIClient();
    this.fetchData();
  }

  fetchData() {
    this.apiClient.fanart
      .getFanart()
      .then(artworks => {
        this.setState({
          status: Status.Done,
          artworks
        });
      })
      .catch(error => {
        this.setState({
          status: Status.Error
        });
        console.error(error);
      });
  }

  render() {
    const { status, artworks } = this.state;

    switch (status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <p>Ett fel inträffade</p>;
      case Status.Done:
        return (
          <div className={styles.viewer}>
            {artworks.map((artwork, index) => {
              return (
                <ArtworkComponent
                  artwork={artwork}
                  key={index}
                ></ArtworkComponent>
              );
            })}
          </div>
        );
    }
  }
}
