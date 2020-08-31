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

const FilterOptions = styled.div`
  display: flex;
  width: 100%;
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
            </FilterOptions>
          </Col>
        </Row>
      </Section>
      {schedules.reduce((schedules, schedule, index) => {
        if (schedule.group === selectedClass) {
          schedules.push(
            <Section key={index}>
              <Row>
                <Col>
                  <ScheduleViewer schedule={schedule} />
                </Col>
              </Row>
            </Section>
          );
        }

        return schedules;
      }, [])}
    </>
  );
};
