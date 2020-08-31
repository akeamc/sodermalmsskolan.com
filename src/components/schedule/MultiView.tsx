import { Schedule, CommonSchedule } from "../../lib/schedule/Schedule";
import React, { useState } from "react";
import { Section } from "../layout/Section";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { ScheduleViewer } from "./Schedule";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Select } from "../form/Select";
const useScheduleClassState = createPersistedState("schedule-class");
const useScheduleGroupFilter = createPersistedState("schedule-groups");

const FilterOptions = styled.div`
  display: flex;
  margin: -1rem;
`;

const FilterOption = styled.div`
  flex: 0 0 12rem;
  margin: 1rem;
`;

const stringToSelectOption = (value: string) => {
  return {
    label: value,
    value,
  };
};

export const ScheduleMultiView: React.FunctionComponent<{
  schedules: Schedule[];
}> = ({ schedules }) => {
  const classes = schedules.map((schedule) => schedule.group);

  const classOptions = classes.map(stringToSelectOption);

  const [selectedClass, setSelectedClass] = useScheduleClassState<string>(
    classes[0]
  );

  const schedule = schedules.find(
    (schedule) => schedule.group === selectedClass
  );

  if (!schedule) {
    setSelectedClass(classes[0]);
  }

  const [selectedGroups, setSelectedGroups] = useScheduleGroupFilter<{
    [key: string]: string;
  }>(
    Array.from(schedule.selectableGroups).reduce((obj, [category, groups]) => {
      obj[category] = groups[0];

      return obj;
    }, {})
  );

  const selectableGroups = Array.from(schedule.selectableGroups);

  const groups: any = Object.values(selectedGroups).flat();

  return (
    <>
      <Section>
        <Row>
          <Col>
            <FilterOptions>
              <FilterOption>
                <Select
                  options={classOptions}
                  placeholder="Undervisningsgrupp"
                  defaultValue={stringToSelectOption(selectedClass)}
                  onChange={({ value }: { value: string; label: string }) => {
                    setSelectedClass(value);
                  }}
                />
              </FilterOption>
              {selectableGroups.map(([category, groups], index) => {
                return (
                  <FilterOption key={index}>
                    <Select
                      options={groups.map(stringToSelectOption)}
                      defaultValue={stringToSelectOption(
                        selectedGroups[category]
                      )}
                      placeholder={category}
                      onChange={({
                        value,
                      }: {
                        value: string;
                        label: string;
                      }) => {
                        let obj = { ...selectedGroups };
                        obj[category] = value;

                        setSelectedGroups(obj);
                      }}
                    />
                  </FilterOption>
                );
              })}
            </FilterOptions>
          </Col>
        </Row>
      </Section>
      <Section>
        <Row>
          <Col>
            <ScheduleViewer schedule={schedule} groups={groups} />
          </Col>
        </Row>
      </Section>
    </>
  );
};
