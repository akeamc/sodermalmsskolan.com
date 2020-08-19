import { NextApiRequest, NextApiResponse } from "next";
import { StatusResponse, getServerStatus } from "../../../lib/minecraft/status";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse>
) => {
  let status = await getServerStatus("minecraft.xn--sdermalmsskolan-8sb.com");

  res.json({
    data: status,
  });
};
