import { APIClient } from "../../utils/api";
import { Status } from "../../utils/status";
import { Spinner } from "../basic/Spinner";
import React from "react";
import { ArtworkComponent } from "./Artwork";
import { Grid } from "../basic/Grid";
import styles from "./FanartViewer.module.scss";
import { Message } from "../../models/Discord";

export class FanartViewer extends React.Component<
  {},
  { status: Status; messages: Message[] }
> {
  private apiClient: APIClient;

  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      messages: [],
    };

    this.apiClient = new APIClient();
    this.fetchData();
  }

  fetchData() {
    this.apiClient.fanart
      .getFanart()
      .then((artworks) => {
        this.setState({
          status: Status.Done,
          messages: artworks,
        });
      })
      .catch((error) => {
        this.setState({
          status: Status.Error,
        });
        console.error(error);
      });
  }

  render() {
    const { status, messages: artworks } = this.state;

    switch (status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <p>Ett fel inträffade</p>;
      case Status.Done:
        return (
          <div className={styles.viewer}>
            <Grid>
              {artworks.map((message, index) => {
                return (
                  <ArtworkComponent
                    message={message}
                    key={index}
                  ></ArtworkComponent>
                );
              })}
            </Grid>
          </div>
        );
    }
  }
}
