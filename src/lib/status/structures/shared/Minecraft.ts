export interface IMinecraftPlayerData {
  /**
   * Number of players online.
   */
  online: number;

  /**
   * Player capacity.
   */
  max: number;
}

export interface IMinecraftStatus {
  players?: {
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
