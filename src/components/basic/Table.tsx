import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;

  tr:not(:last-child) td,
  thead th {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr {
    transition: background-color 0.2s;

    &:nth-child(odd) {
      background: ${({ theme }) => theme.colors.slightlyHighlighted};
    }

    &:hover {
      background: ${({ theme }) => theme.colors.border};
    }
  }

  td,
  th {
    padding: 0.75rem;
    text-align: left;

    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  th {
    font-weight: 700;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Table: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TableWrapper>
      <StyledTable>{children}</StyledTable>
    </TableWrapper>
  );
};
