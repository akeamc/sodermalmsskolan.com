import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  padding: 0 1rem;
  line-height: 2.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.input.background};
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  transition: box-shadow 0.2s ease;
  font-weight: 600;
  font-family: var(--font-sans);
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`;
