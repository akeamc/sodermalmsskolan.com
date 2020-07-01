import { CollectionResponse } from "../api/main/Response";
import { Message, MessageQuery } from "./structures/Message";
import { MessageAttachment } from "discord.js";

/**
 * An interface that holds information about a photo of food posted on Discord.
 */
export interface FoodPhoto {
  url: string;
  proxyUrl: string;
  timestamp: Date;
  description: string;
}

export type FoodPhotosResponse = CollectionResponse<FoodPhoto, number>;

export async function fetchPhotos(
  query: MessageQuery = {}
): Promise<FoodPhotosResponse> {
  const { DISCORD_PHOTOS_CHANNEL } = process.env;

  if (!DISCORD_PHOTOS_CHANNEL) {
    throw new Error("DISCORD_PHOTOS_CHANNEL must be defined.");
  }

  const messages = await Message.fetchMany(DISCORD_PHOTOS_CHANNEL, {
    before: query.before,
    after: query.after,
    limit: query.limit,
  });

  let photos: FoodPhoto[] = [];

  let timestamps = messages.map((message) => message.createdAt.getTime());

  messages.forEach((message) => {
    const { createdAt: timestamp, attachments, content } = message;

    attachments.forEach((attachment) => {
      photos.push({
        url: attachment.url,
        proxyUrl: attachment.proxyUrl,
        timestamp,
        description: content,
      });
    });
  });

  return {
    data: photos,
    meta: {
      total: photos.length,
      previous: Math.min(...timestamps) - 1,
      next: Math.max(...timestamps) + 1,
    },
  };
}
