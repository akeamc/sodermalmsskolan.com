export interface ChannelDetails {
  id: string;
  authenticated: boolean;
}

export interface Channels extends Record<string, ChannelDetails> {
  photos: ChannelDetails;
  news: ChannelDetails;
  telegrams: ChannelDetails;
}

export const DISCORD_CHANNELS: Channels = {
  photos: {
    id: process.env.NEXT_PUBLIC_DISCORD_PHOTOS_CHANNEL,
    authenticated: false,
  },
  news: {
    id: process.env.NEXT_PUBLIC_DISCORD_NEWS_CHANNEL,
    authenticated: true,
  },
  telegrams: {
    id: process.env.NEXT_PUBLIC_DISCORD_TELEGRAM_CHANNEL,
    authenticated: false,
  },
};

export const getChannelDetails = (id: string): ChannelDetails => Object.values(DISCORD_CHANNELS)
  .find((details) => details.id === id);

export const DISCORD_INVITE_LINK = "https://discord.gg/4hEnTpd";
