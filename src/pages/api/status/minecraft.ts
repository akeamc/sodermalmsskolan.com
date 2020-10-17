import { NextApiHandler } from "next";
import {
  IMinecraftServiceStatus,
  ServerMinecraftService,
} from "../../../lib/status/structures/server/Minecraft";

const handler: NextApiHandler<IMinecraftServiceStatus> = async (_, res) => {
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

export default handler;
