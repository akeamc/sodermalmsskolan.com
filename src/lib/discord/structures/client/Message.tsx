import { Message } from "../shared/Message";
import React from "react";
import { Card, CardContent } from "../../../../components/basic/Card";

export class ClientMessage extends Message {
  public Component: React.FunctionComponent = () => {
    return (
      <Card>
        <CardContent>
          <div>
            {this.attachments.map((attachment, index) => {
              return <img src={attachment.url} key={index} />;
            })}
          </div>
          <p>{this.content}</p>
        </CardContent>
      </Card>
    );
  };
}
