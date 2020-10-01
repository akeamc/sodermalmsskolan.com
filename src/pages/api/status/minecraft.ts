import { NextApiRequest, NextApiResponse } from "next";
import {
  IMinecraftServiceStatus,
  ServerMinecraftService,
} from "../../../lib/status/structures/server/Minecraft";

export default async (
  _: NextApiRequest,
  res: NextApiResponse<IMinecraftServiceStatus>
) => {
  const service = new ServerMinecraftService({
    id: "minecraft",
    data: {
      host: "minecraft.xn--sdermalmsskolan-8sb.com",
      port: 25565,
    },
  });

  const status = await service.getStatus();

  res.json(status);
};
