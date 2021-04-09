import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import Button from ".";

export default {
  title: "Button",
  component: Button,
};

// eslint-disable-next-line require-jsdoc
const Template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "Primary",
  variant: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: "Secondary",
  variant: "secondary",
};
