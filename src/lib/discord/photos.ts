import { initializeClient } from "./client";
import Discord, { SnowflakeUtil } from "discord.js";
import { CollectionResponse } from "../api/main/Response";
import { time } from "console";

/**
 * An interface that holds information about a photo of food posted on Discord.
 */
export interface FoodPhoto {
  url: string;
  timestamp: Date;
}

export interface MessageQuery {
  before?: number;
  after?: number;

  /**
   * How many messages to fetch (maximum 100).
   */
  limit?: number;
}

export type FoodPhotoResponse = CollectionResponse<FoodPhoto, number>;

export async function getPhotos(
  query: MessageQuery = {}
): Promise<FoodPhotoResponse> {
  const { DISCORD_PHOTOS_CHANNEL } = process.env;

  if (!DISCORD_PHOTOS_CHANNEL) {
    throw new Error("DISCORD_PHOTOS_CHANNEL must be defined.");
  }

  const client = await initializeClient();
  const channel = await client.channels.fetch(DISCORD_PHOTOS_CHANNEL);

  if (!(channel instanceof Discord.TextChannel)) {
    throw new Error(`${DISCORD_PHOTOS_CHANNEL} is not a text channel!`);
  } else {
    const before = query.before ? SnowflakeUtil.generate(query.before) : null;
    const after = query.after ? SnowflakeUtil.generate(query.after) : null;

    const messages = await channel.messages.fetch({
      before,
      after,
      limit: query.limit,
    });

    let photos: FoodPhoto[] = [];

    let timestamps = messages.map((message) => message.createdTimestamp);

    messages.forEach((message) => {
      const { createdAt: timestamp } = message;

      message.attachments.forEach((attachment) => {
        photos.push({
          url: attachment.url,
          timestamp,
        });
      });
    });

    return {
      data: photos,
      meta: {
        total: photos.length,
        previous: Math.min(...timestamps),
        next: Math.max(...timestamps),
      },
    };
  }
}
