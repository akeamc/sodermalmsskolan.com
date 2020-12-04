import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent, ReactNode } from "react";
import styled, { css, useTheme } from "styled-components";
import { transparentLightPalette } from "../../styles/themes";
import { mutedText } from "../basic/Typography";

export interface SimpleCardProps {
  hoverable?: boolean;
}

export interface HeaderProps {
  image: string;
}

export interface BodyProps {
  title: ReactNode;
  description?: ReactNode;
  background?: string;
  footer?: ReactNode;
  expectsBackground?: boolean;
}

export interface CardProps extends SimpleCardProps {
  href?: string;
  header?: HeaderProps;
  body?: BodyProps;
}

const Foreground = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
`;

export const MainCardText = styled.div`
  padding: 1rem;
`;

const BodyBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;

  img {
    opacity: 0.25;
    transition: opacity 0.1s ease-in-out;
    object-fit: cover;
  }
`;

const Description = styled.p`
  ${mutedText};
  margin: 0;
  margin-top: 1rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
`;

export const StyledCard = styled.a<{ $hoverable?: boolean }>`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  ${({ $hoverable = true }) =>
    $hoverable
      ? css`
          &:hover {
            transform: scale(1.025);
            box-shadow: ${({ theme }) => theme.shadows.large};

            ${BodyBackground} {
              img {
                opacity: 0.675;
              }
            }
          }
        `
      : null}
`;

const HeaderWrapper = styled.div`
  min-height: 16rem;
  position: relative;
  overflow: hidden;
`;

const FooterWrapper = styled.div`
  padding: 1rem;

  p {
    margin: 0;
  }
`;

const BodyWrapper = styled.div<{ $expectsBackground?: boolean }>`
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.foreground};

  ${({ $expectsBackground, theme }) =>
    $expectsBackground
      ? css`
          background-color: ${theme.colors.skeleton.base};

          ${MainCardText} {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        `
      : css`
          ${FooterWrapper} {
            border-top: 1px solid ${theme.colors.border};
          }
        `}
`;

const Title = styled.h3`
  --size-xs: 1.125rem;
  --size-sm: 1.125rem;
  --size-lg: 1.125rem;
  --size-xl: 1.125rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Header: FunctionComponent<HeaderProps> = ({ image }) => {
  return (
    <HeaderWrapper>
      {image ? <Image src={image} layout="fill" draggable="false" /> : null}
    </HeaderWrapper>
  );
};

export const Body: FunctionComponent<BodyProps> = ({
  title,
  description,
  background,
  expectsBackground,
  footer,
}) => {
  const defaultTheme = useTheme();

  const theme = {
    ...defaultTheme,
    colors: background ? transparentLightPalette : defaultTheme.colors,
  };

  console.log(theme.colors.foreground);

  return (
    <BodyWrapper theme={theme} $expectsBackground={expectsBackground}>
      <Foreground theme={theme}>
        <MainCardText>
          <Title theme={theme}>{title}</Title>
          {description ? (
            <Description theme={theme}>{description}</Description>
          ) : null}
        </MainCardText>
        {footer ? <FooterWrapper>{footer}</FooterWrapper> : null}
      </Foreground>

      {background ? (
        <BodyBackground>
          <Image src={background} layout="fill" />
        </BodyBackground>
      ) : null}
    </BodyWrapper>
  );
};

/**
 * A flexible card.
 */
const Card: FunctionComponent<CardProps> = ({
  children,
  header,
  body,
  href,
  hoverable,
}) => {
  const card = (
    <StyledCard $hoverable={hoverable}>
      {children || (
        <>
          {header ? <Header {...header} /> : null}
          {body ? <Body {...body} /> : null}
        </>
      )}
    </StyledCard>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {card}
      </Link>
    );
  }

  return card;
};

export const SimpleCard: React.FunctionComponent<SimpleCardProps> = ({
  children,
  hoverable,
}) => {
  return (
    <StyledCard $hoverable={hoverable}>
      <MainCardText>{children}</MainCardText>
    </StyledCard>
  );
};

export default Card;
