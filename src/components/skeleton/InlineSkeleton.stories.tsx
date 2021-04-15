import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import InlineSkeleton from "./InlineSkeleton";

export default {
  title: "InlineSkeleton",
  component: InlineSkeleton,
};

const Template: Story<
ComponentProps<typeof InlineSkeleton>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <p style={{
    maxWidth: 300,
  }}
  >
    <InlineSkeleton {...args} />
  </p>
);

export const Default = Template.bind({});

Default.args = {
  count: 5,
};
