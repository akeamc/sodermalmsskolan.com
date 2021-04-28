import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import LogoIcon from "./LogoIcon";

export default {
  title: "LogoIcon",
  component: LogoIcon,
};

const Template: Story<
ComponentProps<typeof LogoIcon>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <LogoIcon {...args} />
);

export const Default = Template.bind({});

Default.args = {
  width: "48px",
};
