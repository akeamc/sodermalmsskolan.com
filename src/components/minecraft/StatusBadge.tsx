import React from "react";
import { useMinecraftStatus } from "../../lib/api/main/minecraft/status";
import styled from "styled-components";
import { StatusColor, StatusBadge } from "../misc/StatusBadge";

const Tnum = styled.span`
  font-feature-settings: "tnum", "ss01", "zero";
`;

export const MinecraftStatusBadge: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { data } = useMinecraftStatus();
  const players = data?.players;

  const color = data?.online ? StatusColor.Success : StatusColor.Error;

  const text = data?.online ? (
    <>
      <Tnum>
        {players?.online}/{players?.max}
      </Tnum>{" "}
      online
    </>
  ) : (
    "Offline"
  );

  return (
    <StatusBadge label="Minecraft" value={text} color={color} {...props} />
  );
};
