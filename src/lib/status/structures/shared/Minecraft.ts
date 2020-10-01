export interface IMinecraftPlayers {
  /**
   * Number of players online.
   */
  online: number;

  /**
   * Player capacity.
   */
  max: number;

  /**
   * Array of the names of the currently active players.
   */
  names: string[];
}

export interface IMinecraftStatus {
  players: IMinecraftPlayers;

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
