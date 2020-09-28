import { IMinecraftStatus } from "../shared/Minecraft";
import { Client, PacketWriter, State } from "mcproto";
import { ServerService } from "./Service";
import { IServiceStatus } from "../shared/Service";

/**
 * Get the status of a Minecraft server.
 * @param host
 * @param port
 */
export async function getServerStatus(
  host: string,
  port: number = 25565
): Promise<[boolean, IMinecraftStatus]> {
  try {
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

    return [
      true,
      {
        players: {
          max: data.players.max,
          online: data.players.online,
        },
        version: data.version.name,
        motd: data.description.text,
        favicon: data.favicon,
      },
    ];
  } catch (error) {
    return [
      false,
      {
        players: {
          max: 0,
          online: 0,
        },
        version: null,
        motd: null,
        favicon: null,
      },
    ];
  }
}

export interface IMinecraftServer {
  host: string;
  port?: number;
}

export class ServerMinecraftService extends ServerService<
  IMinecraftServer,
  IMinecraftStatus
> {
  public async getStatus() {
    const [online, data] = await getServerStatus(
      this.data.host,
      this.data.port
    );

    return {
      id: this.id,
      online,
      data,
    };
  }
}

export type IMinecraftServiceStatus = IServiceStatus<IMinecraftStatus>;
