import React, { FunctionComponent } from "react";
import Skeleton, { SkeletonProps } from "./Skeleton";

export interface InlineSkeletonProps extends SkeletonProps {
  count?: number;
}

const InlineSkeleton: FunctionComponent<InlineSkeletonProps> = ({
  count = 1,
  ...skeletonProps
}) => (
  <span>
    {Array.from({ length: count }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={index} {...skeletonProps}>
        &zwnj;
      </Skeleton>
    ))}
  </span>
);

export default InlineSkeleton;
