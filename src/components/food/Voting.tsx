import React from "react";
import styled, { useTheme } from "styled-components";
import { motion, Variants } from "framer-motion";
import { useAuth } from "../../providers/Auth";
import { ClientVote } from "../../lib/food/structures/client/Vote";
import { IconButton } from "../basic/Button";
import { ThumbsDown, ThumbsUp } from "react-feather";
import Link from "next/link";
import { Anchor } from "../basic/Typography";
import { loginLink } from "../../lib/auth/href";
import { useRouter } from "next/router";

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

const VoteNumber = styled(motion.span)`
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
  margin: 0.5rem 0;
`;

const VoteButton = styled(IconButton)`
  svg {
    transition: fill 0.1s ease;
  }
`;

const DishVoteRow: React.FunctionComponent<{
  dish: string;
  show?: boolean;
}> = ({ show = true, dish }) => {
  const { data, mutate } = ClientVote.useByDish(dish);
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const loading = !data;

  const voteButtonVariants: Variants = {
    show: {
      scale: 1,
    },
    hide: {
      scale: 0,
    },
  };

  const userVote = data?.find((vote) => vote.author === user?.discord.id);

  const votedPositive = userVote && userVote?.positive;
  const votedNegative = userVote && !userVote?.positive;

  const setVote = async (positive: boolean) => {
    await ClientVote.sendVote(dish, positive);
  };

  const deleteVote = async () => {
    await ClientVote.deleteVote(dish);
  };

  const handleClick = (positive: boolean) => {
    mutate(null, false);

    function voteCallback() {
      mutate(null, true);
    }

    if ((votedPositive && positive) || (votedNegative && !positive)) {
      return deleteVote().then(voteCallback);
    }

    return setVote(positive).then(voteCallback);
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
      initial={false}
    >
      {isAuthenticated ? (
        <>
          <VoteButton variants={voteButtonVariants} $disabled={loading}>
            <ThumbsUp
              fill={votedPositive ? theme.colors.primary : "transparent"}
              onClick={() => {
                handleClick(true);
              }}
            />
          </VoteButton>
          <VoteButton variants={voteButtonVariants} $disabled={loading}>
            <ThumbsDown
              fill={votedNegative ? theme.colors.primary : "transparent"}
              onClick={() => {
                handleClick(false);
              }}
            />
          </VoteButton>
        </>
      ) : (
        <motion.small variants={voteButtonVariants}>
          Du måste{" "}
          <Link href={loginLink(router.pathname)} passHref>
            <Anchor>logga in</Anchor>
          </Link>{" "}
          för att rösta.
        </motion.small>
      )}
    </VoteButtonRow>
  );
};

export const DishVotes: React.FunctionComponent<{
  id: string;
  detailed?: boolean;
}> = ({ id, detailed = false }) => {
  const { data: votes } = ClientVote.useByDish(id);

  const positiveShare =
    (votes?.filter((vote) => vote.positive)?.length || 0) /
    Math.max(votes?.length, 1);
  const loading = !votes;

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
        $positive={positiveShare}
        animate={detailed ? "detailed" : "small"}
        initial
      >
        <VoteNumber
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
              {Math.round(positiveShare * 100)}% ({votes?.length || 0})
            </>
          )}
        </VoteNumber>
      </DishVoteBar>
      <DishVoteRow dish={id} show={detailed} />
    </>
  );
};
