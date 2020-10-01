import { IMinecraftStatus } from "../shared/Minecraft";
import { Client, PacketWriter, State } from "mcproto";
import { ServerService } from "./Service";
import { IServiceStatus } from "../shared/Service";
import Query from "mcquery";

export interface IMinecraftServer {
  host: string;
  port: number;
}

export class ServerMinecraftService extends ServerService<
  IMinecraftServer,
  IMinecraftStatus
> {
  private async getPlayerNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const query = new Query(this.data.host, this.data.port);

      query.connect().then(() => {
        query.full_stat((error, response) => {
          if (error) {
            return reject(error);
          }

          return resolve(response.player_);
        });
      });
    });
  }

  private async _getStatus(): Promise<IMinecraftStatus> {
    const { host, port } = this.data;

    const client = await Client.connect(host, port);

    client.send(
      new PacketWriter(0x0)
        .writeVarInt(404)
        .writeString(host)
        .writeUInt16(port)
        .writeVarInt(State.Status)
    );

    client.send(new PacketWriter(0x0));

    const response = await client.nextPacket(0x0);

    let data = response.readJSON();

    client.end();

    return {
      players: {
        max: data.players.max,
        online: data.players.online,
        names: await this.getPlayerNames(),
      },
      version: data.version.name,
      motd: data.description.text,
      favicon: data.favicon,
    };
  }

  public async getStatus() {
    const data: IMinecraftStatus = await this._getStatus().catch(() => null);

    const online = !!data;

    return {
      id: this.id,
      online,
      data,
    };
  }
}

export type IMinecraftServiceStatus = IServiceStatus<IMinecraftStatus>;
