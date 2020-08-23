import styled from "styled-components";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import AuthorCard, { AuthorCardRow } from "./AuthorCard";
import * as breakpoints from "../../../styles/breakpoints";
import Skeleton from "react-loading-skeleton";

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
  color: var(--accents-5);
  margin-bottom: 0.875rem;

  &:not(:last-child) {
    margin-right: 15px;
    padding-right: 15px;

    @media (min-width: ${breakpoints.large}) {
      border-right: 1px solid var(--accents-2);
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
      <small>{skeleton ? <Skeleton width={100} /> : dateText}</small>
    </MetaField>
  </MetaRow>
);

export default PostMeta;
