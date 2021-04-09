import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import { ArrowRight, Zap } from "react-feather";
import Button from ".";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
    leftIcon: {
      table: {
        disable: true,
      },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
  },
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

export const Tertiary = Template.bind({});

Tertiary.args = {
  children: "Tertiary",
  variant: "tertiary",
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: "Disabled",
  disabled: true,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  children: "Continue",
  variant: "primary",
  rightIcon: ArrowRight,
};

export const Icon = Template.bind({});

Icon.args = {
  icon: Zap,
};
