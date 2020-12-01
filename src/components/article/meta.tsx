import styled from "styled-components";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import { AuthorCardRow } from "./author";
import * as breakpoints from "../../styles/breakpoints";
import { Skeleton } from "../basic/Skeleton";

const MetaRow = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: -0.875rem;
`;

export const MetaField = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.875rem;

  &:not(:last-child) {
    margin-right: 15px;
    padding-right: 15px;

    @media (min-width: ${breakpoints.large}) {
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

const PostMeta: React.FunctionComponent<{
  post: PostOrPage;
  dateText: string;
  skeleton?: boolean;
}> = ({ post, dateText, skeleton = false }) => (
  <MetaRow>
    <MetaField>
      <AuthorCardRow authors={post?.authors} skeleton={skeleton} />
    </MetaField>
    <MetaField>
      <small>{skeleton ? <Skeleton width="100px" /> : dateText}</small>
    </MetaField>
  </MetaRow>
);

export default PostMeta;
