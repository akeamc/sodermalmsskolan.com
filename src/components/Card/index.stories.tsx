import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import Card from ".";

export default {
  title: "Card",
  component: Card,
};

// eslint-disable-next-line require-jsdoc
const Template: Story<ComponentProps<typeof Card>> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "This is a card.",
};
