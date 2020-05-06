import { APIClient } from "../../utils/api";
import { Status } from "../../utils/status";
import { Spinner } from "../basic/Spinner";
import React from "react";
import { ArtworkComponent } from "./Artwork";
import { Message } from "../../models/Discord";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";
import { getBreakpoints } from "../../utils/breakpoints";

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
    const breakpoints = getBreakpoints();

    switch (status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <p>Ett fel inträffade</p>;
      case Status.Done:
        return (
          <SizeMe>{({ size: { width } }) => {
            let columnWidth = 1;

            if (width >= breakpoints.mobile) {
              columnWidth = 0.5;
            }

            if (width >= breakpoints.tablet) {
              columnWidth = 1 / 3;
            }

            if (width >= breakpoints.desktop) {
              columnWidth = 0.25;
            }

            return <StackGrid
              columnWidth={(columnWidth * 100) + "%"}
              gutterWidth={24}
              gutterHeight={24}
              monitorImagesLoaded={true}
            >
              {artworks.map((message, index) => {
                return (
                  <ArtworkComponent
                    message={message}
                    key={index}
                  ></ArtworkComponent>
                );
              })}
            </StackGrid>
          }}</SizeMe>
        );
    }
  }
}
