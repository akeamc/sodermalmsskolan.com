import styled, { useTheme } from "styled-components";
import React from "react";
import { Skeleton } from "../basic/Skeleton";

const Container = styled.div`
  padding: 0 12px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  float: left;
  display: flex;
  align-items: center;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StatusIndicator = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 7px;
  background-color: ${(props) => props.color};
`;

const BadgeValue = styled.small<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 500;
`;

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  color: string;
  isValidating?: boolean;
}

export const StatusBadge: React.FunctionComponent<StatusBadgeProps> = ({
  label,
  value,
  color,
  isValidating = false,
  ...props
}) => {
  const { colors } = useTheme();

  color = isValidating ? colors.skeleton.base : color;
  value = isValidating ? <Skeleton width="48px" /> : value;

  return (
    <Container {...props}>
      <small>{label}</small> <StatusIndicator color={color} />{" "}
      <BadgeValue color={color}>{value}</BadgeValue>
    </Container>
  );
};
