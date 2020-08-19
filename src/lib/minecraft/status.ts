import { BasicResponse } from "../api/main/Response";
import { Client, PacketWriter, State } from "mcproto";

/**
 * Server status.
 */
export interface Status {
  online: boolean;
  players: {
    /**
     * Number of players online.
     */
    online: number;

    /**
     * Player capacity.
     */
    max: number;
  };

  /**
   * Version of the server, e.g. `1.16.1`.
   */
  version: string;

  /**
   * Message of the day.
   */
  motd: string;
  /**
   * Base64-encoded PNG of the server icon.
   */
  favicon: string;
}

export type StatusResponse = BasicResponse<Status>;

/**
 * Get the status of a Minecraft server.
 * @param host
 * @param port
 */
export async function getServerStatus(
  host: string,
  port: number = 25565
): Promise<Status> {
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

    return {
      online: true,
      players: {
        max: data.players.max,
        online: data.players.online,
      },
      version: data.version.name,
      motd: data.description.text,
      favicon: data.favicon,
    };
  } catch (error) {
    return {
      online: false,
      players: {
        max: 0,
        online: 0,
      },
      version: null,
      motd: null,
      favicon: null,
    };
  }
}
