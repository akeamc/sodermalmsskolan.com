import { Message } from "../shared/Message";
import React from "react";

export class ClientMessage extends Message {
  display: React.FunctionComponent = () => {
    return <p>{this.content}</p>;
  };
}
