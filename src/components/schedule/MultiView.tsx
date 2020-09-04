import { Schedule, CommonSchedule } from "../../lib/schedule/Schedule";
import React, { useState, useEffect } from "react";
import { Section } from "../layout/Section";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { ScheduleViewer } from "./Schedule";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Select } from "../form/Select";
import { GroupFilter } from "../../lib/schedule/Filter";
const useScheduleClassState = createPersistedState("schedule-class");
const useScheduleGroupFilter = createPersistedState("schedule-groups");

const FilterOptions = styled.div`
  display: flex;
  margin: -0.5rem;
  flex-wrap: wrap;
`;

const FilterOption = styled.div`
  flex: 1 0 12rem;
  margin: 0.5rem;
  max-width: 20rem;
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

  const [schedule, setSchedule] = useState(schedules[0]);

  useEffect(() => {
    const selectedSchedule = schedules.find(
      (schedule) => schedule.group === selectedClass
    );

    if (selectedSchedule) {
      setSchedule(selectedSchedule);
    } else {
      setSelectedClass(classes[0]);
    }
  });

  const defaultSelectedGroups = () => {
    return Array.from(schedule.selectableGroups).reduce(
      (obj, [category, groups]) => {
        obj[category] = groups[0];

        return obj;
      },
      {}
    );
  };

  const [selectedGroups, setSelectedGroups] = useScheduleGroupFilter<
    GroupFilter
  >(defaultSelectedGroups());

  const selectableGroups = Array.from(schedule.selectableGroups);

  selectableGroups.forEach(([category, groups]) => {
    if (!groups.includes(selectedGroups[category])) {
      return setSelectedGroups(defaultSelectedGroups());
    }
  });

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
                  value={stringToSelectOption(selectedClass)}
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
                      value={stringToSelectOption(selectedGroups[category])}
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
            <ScheduleViewer schedule={schedule} groups={selectedGroups} />
          </Col>
        </Row>
      </Section>
    </>
  );
};
