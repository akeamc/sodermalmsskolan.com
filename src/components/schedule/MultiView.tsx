import { Schedule, CommonSchedule } from "../../lib/schedule/Schedule";
import React, { useState } from "react";
import { Section } from "../layout/Section";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { ScheduleViewer } from "./Schedule";
import styled from "styled-components";
import Select from "react-select";
import createPersistedState from "use-persisted-state";
const useScheduleFilterState = createPersistedState("schedule-filter");

const FilterContainer = styled.div``;

export const ScheduleMultiView: React.FunctionComponent<{
  schedules: Schedule[];
}> = ({ schedules }) => {
  const selectableGroups = CommonSchedule.selectableGroups;

  const groupOption = (groupName: string) => {
    return {
      label: groupName,
      value: groupName,
    };
  };

  const groupOptions = Array.from(selectableGroups).map(
    ([category, groups]) => {
      return {
        label: category,
        options: groups.map(groupOption),
      };
    }
  );

  const [selectedGroups, setSelectedGroups] = useScheduleFilterState<string[]>(
    Array.from(selectableGroups.values()).flat()
  );

  const defaultSelected = selectedGroups.map(groupOption);

  return (
    <>
      <Section>
        <Row>
          <Col>
            <FilterContainer>
              <Select
                options={groupOptions}
                isMulti
                placeholder="Filtrera"
                defaultValue={defaultSelected}
                onChange={(selected: { label: string; value: string }[]) => {
                  const groups = selected?.map((option) => option.value) || [];

                  setSelectedGroups(groups);
                }}
              />
            </FilterContainer>
          </Col>
        </Row>
      </Section>
      {schedules.map((schedule, index) => {
        return (
          <Section key={index}>
            <Row>
              <Col>
                <ScheduleViewer schedule={schedule} groups={selectedGroups} />
              </Col>
            </Row>
          </Section>
        );
      })}
    </>
  );
};
