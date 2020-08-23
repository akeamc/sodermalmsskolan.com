import styled from "styled-components";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import AuthorCard from "./AuthorCard";
import * as breakpoints from "../../../styles/breakpoints";

const MetaRow = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const MetaField = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--accents-5);

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
}> = ({ post, dateText }) => (
  <MetaRow>
    <MetaField>
      {(post?.authors || []).map((author, index) => (
        <AuthorCard key={index} author={author} />
      ))}
    </MetaField>
    <MetaField>
      <small>{dateText}</small>
    </MetaField>
  </MetaRow>
);

export default PostMeta;
