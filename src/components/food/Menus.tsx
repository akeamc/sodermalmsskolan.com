import styled, { useTheme } from "styled-components";
import React, { useState } from "react";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import * as breakpoints from "../../styles/breakpoints";
import { ClientMenu } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import { useLocale } from "../../hooks/locale";
import { Card, CardContent, CardTitle } from "../basic/Card";
import { motion, Variants } from "framer-motion";
import { Skeleton } from "../basic/Skeleton";
import { IconButton } from "../basic/Button";
import { ArrowDown, ThumbsDown, ThumbsUp } from "react-feather";
import { useAuth } from "../../providers/Auth";
import { ClientVote } from "../../lib/food/structures/client/Vote";

const DishList = styled.ul`
  margin-top: 1rem;
  margin-bottom: 0;

  li:last-child {
    margin-bottom: 0;
  }
`;

const DishEmissions: React.FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = ClientDish.use(id);
  const { locale } = useLocale();

  return (
    <motion.span>
      ({data?.co2e.toLocaleString(locale) || <Skeleton width="32px" />} kg CO₂e
      per portion)
    </motion.span>
  );
};

const DishVoteBar = styled(motion.div)<{
  $loading: boolean;
  $positive: number;
}>`
  width: 100%;
  background-color: ${({ $loading, theme }) =>
    $loading ? theme.colors.skeleton.base : theme.colors.border};
  position: relative;
  margin-top: 0.5rem;
  transition: background-color 0.1s ease;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({ $positive, $loading }) => `${$loading ? 0 : $positive * 100}%`};
    background-color: ${({ theme }) => theme.colors.success};
    transition: width 0.2s ease-in-out;
  }
`;

const RatingNumber = styled(motion.span)`
  z-index: 1;
  user-select: none;
  font-size: 0.875rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  display: inline-block;
`;

const VoteButtonRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const VoteButton = styled(IconButton)``;

const DishVoteRow: React.FunctionComponent<{ id: string; show?: boolean }> = ({
  show = true,
  id,
}) => {
  const { data, mutate } = ClientDish.use(id);
  const { user } = useAuth();
  const theme = useTheme();

  const voteButtonVariants: Variants = {
    show: {
      scale: 1,
    },
    hide: {
      scale: 0,
    },
  };

  const userVote = data?.votes?.find(
    (vote) => vote.author === user?.discord.id
  );

  const votedPositive = userVote && userVote?.positive;
  const votedNegative = userVote && !userVote?.positive;

  const setVote = async (positive: boolean) => {
    await ClientVote.sendVote(id, positive);
  };

  const deleteVote = async () => {
    await ClientVote.deleteVote(id);
  };

  const handleClick = (positive: boolean) => {
    mutate(null, false);

    if ((votedPositive && positive) || (votedNegative && !positive)) {
      return deleteVote().then(() => {
        mutate(null, true);
      });
    }

    return setVote(positive).then(() => {
      mutate(null, true);
    });
  };

  return (
    <VoteButtonRow
      variants={{
        show: {
          height: "auto",
        },
        hide: {
          height: 0,
        },
      }}
      animate={show ? "show" : "hide"}
      initial
    >
      <VoteButton variants={voteButtonVariants}>
        <ThumbsUp
          fill={votedPositive ? theme.colors.primary : "transparent"}
          onClick={() => {
            handleClick(true);
          }}
        />
      </VoteButton>
      <VoteButton variants={voteButtonVariants}>
        <ThumbsDown
          fill={votedNegative ? theme.colors.primary : "transparent"}
          onClick={() => {
            handleClick(false);
          }}
        />
      </VoteButton>
    </VoteButtonRow>
  );
};

const DishVoteResults: React.FunctionComponent<{
  id: string;
  detailed?: boolean;
}> = ({ id, detailed = false }) => {
  const { data } = ClientDish.use(id);

  const loading = !data;

  return (
    <>
      <DishVoteBar
        variants={{
          detailed: {
            height: "2rem",
          },
          small: {
            height: "2px",
          },
        }}
        $loading={loading}
        $positive={data?.positiveShare}
        animate={detailed ? "detailed" : "small"}
        initial
      >
        <RatingNumber
          variants={{
            detailed: {
              opacity: 1,
            },
            small: {
              opacity: 0,
            },
          }}
        >
          {loading ? (
            "Läser in ..."
          ) : (
            <>
              {Math.round(data?.positiveShare * 100)}% (
              {data?.votes?.length || 0})
            </>
          )}
        </RatingNumber>
      </DishVoteBar>
      <DishVoteRow id={id} show={detailed} />
    </>
  );
};

const DishItem: React.FunctionComponent<{ dish: Dish; detailed?: boolean }> = ({
  dish,
  detailed = false,
}) => {
  const loading = !dish;

  return (
    <motion.li>
      {loading ? (
        <Skeleton count={2} />
      ) : (
        <>
          {dish?.title} <DishEmissions id={dish?.id} />
        </>
      )}
      <DishVoteResults id={dish?.id} detailed={detailed} />
    </motion.li>
  );
};

const CollapseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const StyledCollapseButton = styled(IconButton)<{ open: boolean }>`
  transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
`;

const CollapseButton: React.FunctionComponent<{
  onClick: () => void;
  open: boolean;
}> = ({ onClick, open }) => {
  return (
    <CollapseButtonContainer>
      <StyledCollapseButton open={open} onClick={onClick}>
        <ArrowDown />
      </StyledCollapseButton>
    </CollapseButtonContainer>
  );
};

const MenuCard: React.FunctionComponent<{
  menu: ClientMenu;
  onClick?: () => void;
}> = ({ menu, onClick }) => {
  const fallback = new Array(2).fill(null);
  const [detailed, setDetailed] = useState<boolean>(false);

  return (
    <Card layoutId={menu?.id} onClick={onClick}>
      <CardContent>
        <CardTitle>{menu?.title || <Skeleton />}</CardTitle>
        <DishList>
          {(menu?.dishes || fallback).map((dish, index) => (
            <DishItem key={index} dish={dish} detailed={detailed} />
          ))}
        </DishList>
        <CollapseButton
          open={detailed}
          onClick={() => setDetailed(!detailed)}
        />
      </CardContent>
    </Card>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MenuList: React.FunctionComponent<{
  limit: number;
}> = ({ limit }) => {
  const { data } = ClientMenu.use({ limit });
  const fallbackArray: ClientMenu[] = new Array(limit).fill(null);
  const menus = data?.length > 0 ? data : fallbackArray;

  return (
    <Base>
      <Col>
        <Grid>
          {menus.map((menu, index) => (
            <MenuCard key={index} menu={menu} />
          ))}
        </Grid>
      </Col>
    </Base>
  );
};
