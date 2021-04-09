import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import MenuCard from "./MenuCard";

export default {
  title: "MenuCard",
  component: MenuCard,
};

// eslint-disable-next-line require-jsdoc
const Template: Story<ComponentProps<typeof MenuCard>> = (args) => <MenuCard {...args} />;

export const Default = Template.bind({});
