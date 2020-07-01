import { CollectionResponse } from "../api/main/Response";
import { Message, MessageQuery } from "./structures/Message";
import { time } from "console";

/**
 * An interface that holds information about a photo of food posted on Discord.
 */
export interface FoodPhoto {
  url: string;
  timestamp: Date;
}

export type FoodPhotosResponse = CollectionResponse<FoodPhoto, number>;

export async function fetchPhotos(
  query: MessageQuery = {}
): Promise<FoodPhotosResponse> {
  const { DISCORD_PHOTOS_CHANNEL } = process.env;

  if (!DISCORD_PHOTOS_CHANNEL) {
    throw new Error("DISCORD_PHOTOS_CHANNEL must be defined.");
  }

  // const before = query.before ? SnowflakeUtil.generate(query.before) : null;
  // const after = query.after ? SnowflakeUtil.generate(query.after) : null;

  const messages = await Message.fetchMany(DISCORD_PHOTOS_CHANNEL, {
    before: query.before ? new Date(query.before) : null,
    after: query.after ? new Date(query.after) : null,
    limit: query.limit,
  });

  let photos: FoodPhoto[] = [];

  let timestamps = messages.map((message) => message.createdAt.getTime());

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
