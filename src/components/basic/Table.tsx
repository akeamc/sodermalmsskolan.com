import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid var(--accents-2);
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;

  tr:not(:last-child) td,
  thead th {
    border-bottom: 1px solid var(--accents-2);
  }

  tbody tr {
    transition: background-color 0.2s;

    &:nth-child(odd) {
      background: var(--accents-1);
    }

    &:hover {
      background: var(--accents-2);
    }
  }

  td,
  th {
    padding: 0.75rem;
    text-align: left;

    &:not(:last-child) {
      border-right: 1px solid var(--accents-2);
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
