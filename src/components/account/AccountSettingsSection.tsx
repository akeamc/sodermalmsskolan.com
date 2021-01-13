import React, { FunctionComponent } from "react";
import CardGridSection from "../CardGridSection";
import { SectionProps } from "../section/Section";
import DisplayNameSetting from "./settings/DisplayNameSetting";
import InstagramSettings from "./settings/InstagramSettings";

export type AccountSettingsSectionProps = SectionProps;

const AccountSettingsSection: FunctionComponent<AccountSettingsSectionProps> = ({
  ...sectionProps
}) => (
  <CardGridSection {...sectionProps}>
    <DisplayNameSetting />
    <InstagramSettings />
  </CardGridSection>
);

export default AccountSettingsSection;
