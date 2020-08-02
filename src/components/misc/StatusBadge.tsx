import styled from "styled-components";

const Container = styled.div`
  padding: 0 12px;
  border-radius: 5px;
  border: 1px solid #eee;
  float: left;
  display: flex;
  align-items: center;
  height: 32px;
  background-color: #fff;
`;

export enum StatusColor {
  Success = "#335eea",
  Error = "#df4759",
  Waiting = "#ccc",
}

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
  label: JSX.Element | string;
  value: JSX.Element | string;
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
  color = isValidating ? StatusColor.Waiting : color;
  value = isValidating ? "Uppdaterar" : value;

  return (
    <Container {...props}>
      <small>{label}</small> <StatusIndicator color={color} />{" "}
      <BadgeValue color={color}>{value}</BadgeValue>
    </Container>
  );
};
