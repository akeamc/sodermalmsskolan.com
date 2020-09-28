import React from "react";
import styled from "styled-components";
import { useMinecraftStatus } from "../../lib/status/structures/client/Service";
import { StatusColor, StatusBadge } from "../misc/StatusBadge";

const Tnum = styled.span`
  font-feature-settings: "tnum", "ss01", "zero";
`;

export const MinecraftStatusBadge: React.FunctionComponent<React.HTMLAttributes<
  HTMLDivElement
>> = (props) => {
  const { data: status, isValidating } = useMinecraftStatus();

  const players = status?.data?.players;

  const color = status?.online ? StatusColor.Success : StatusColor.Error;

  const text = status?.online ? (
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
    <StatusBadge
      label="Minecraft"
      value={text}
      color={color}
      isValidating={isValidating}
      {...props}
    />
  );
};
