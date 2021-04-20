import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import Badge from ".";

export default {
  title: "Badge",
  component: Badge,
};

const Template: Story<
ComponentProps<typeof Badge>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <Badge {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: "Badge",
};
