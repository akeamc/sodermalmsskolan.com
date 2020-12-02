import React from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { motion, Variants } from "framer-motion";
import { useAuth } from "../../providers/Auth";
import { ClientVote, useVotes } from "../../lib/food/structures/client/Vote";
import { IconButton } from "../basic/Button";
import { ThumbsDown, ThumbsUp } from "react-feather";
import Link from "next/link";
import { Anchor } from "../basic/Typography";
import { loginLink } from "../../lib/auth/href";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const barAnimation = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -1rem 0;
  }
`;

const DishVoteBar = styled(motion.div)<{
  $loading: boolean;
  $upShare: number;
}>`
  width: 100%;
  background-image: ${({ theme }) => `repeating-linear-gradient(
    90deg,
    ${theme.colors.skeleton.base},
    ${theme.colors.skeleton.base} 0.5rem,
    ${theme.colors.skeleton.highlight} 0.5rem,
    ${theme.colors.skeleton.highlight} 1rem
  )`};
  background-size: 1rem 100%;
  position: relative;
  margin-top: 0.5rem;
  transition: background-color 0.1s ease;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  animation: ${barAnimation} 1s linear infinite;

  ${({ $loading, theme }) =>
    !$loading &&
    `
    animation: none;
    background: ${theme.colors.border};
  `};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({ $upShare, $loading }) => `${$loading ? 0 : $upShare * 100}%`};
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
  const { data, mutate } = useVotes({ dish });
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

  const userVote = data?.find((vote) => vote.author === user?.uid);

  const votedUp = userVote && userVote?.up;
  const votedDown = userVote && userVote?.down;

  const setVote = async (up: boolean) => {
    await ClientVote.sendVote(dish, up);

    toast("Din röst har registrerats.");
  };

  const deleteVote = async () => {
    await ClientVote.deleteVote(dish);

    toast("Din röst har tagits bort.");
  };

  const handleClick = (up: boolean) => {
    mutate(null, false);

    function voteCallback() {
      mutate(() => ClientVote.fetchByDish({ dish }, true), false);
    }

    if ((votedUp && up) || (votedDown && !up)) {
      return deleteVote().then(() => voteCallback());
    }

    return setVote(up).then(() => voteCallback());
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
              fill={votedUp ? theme.colors.primary : "transparent"}
              onClick={() => {
                handleClick(true);
              }}
            />
          </VoteButton>
          <VoteButton variants={voteButtonVariants} $disabled={loading}>
            <ThumbsDown
              fill={votedDown ? theme.colors.primary : "transparent"}
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
  const { data: votes } = useVotes({ dish: id });

  const upShare =
    (votes?.filter((vote) => vote.up)?.length || 0) /
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
        $upShare={upShare}
        animate={detailed ? "detailed" : "small"}
        initial={false}
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
              {Math.round(upShare * 100)}% ({votes?.length || 0})
            </>
          )}
        </VoteNumber>
      </DishVoteBar>
      <DishVoteRow dish={id} show={detailed} />
    </>
  );
};
