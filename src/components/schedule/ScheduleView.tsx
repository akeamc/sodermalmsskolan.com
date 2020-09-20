import { Schedule } from "../../lib/schedule/Schedule";
import React, { useState, useEffect } from "react";
import { Section } from "../layout/Section";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { ScheduleTable } from "./Table";
import styled from "styled-components";
import createPersistedState from "../../hooks/node_modules/use-persisted-state";
import { Select } from "../form/Select";
import { GroupFilter } from "../../lib/schedule/Filter";
import { useTime } from "../../hooks/time";
import { PeriodCard } from "./PeriodCard";
import { usePersistedState } from "../../hooks/persistedstate";
const useScheduleClassState = createPersistedState("schedule-class");

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

const PeriodCards: React.FunctionComponent<{
  schedule: Schedule;
  groups: GroupFilter;
  groupName: string;
}> = ({ schedule, groups, groupName }) => {
  const now = useTime(1000);

  const nextPeriodGroup = schedule.periods.filterByGroups(groups).next(now);
  const nextPeriod = nextPeriodGroup.getPeriodByGroup(
    groups[nextPeriodGroup.groupCategory]
  );

  return (
    <>
      <PeriodCard period={nextPeriod} groupName={groupName} />
    </>
  );
};

export const ScheduleView: React.FunctionComponent<{
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

  const selectableGroups = Array.from(schedule.selectableGroups);

  const defaultSelectedGroups = () => {
    return selectableGroups.reduce((obj, [category, groups]) => {
      obj[category] = groups[0];

      return obj;
    }, {});
  };

  const [selectedGroups, setSelectedGroups] = usePersistedState<GroupFilter>(
    "schedule-groups",
    defaultSelectedGroups()
  );

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
            <PeriodCards
              schedule={schedule}
              groups={selectedGroups}
              groupName={selectedClass}
            />
          </Col>
        </Row>
      </Section>
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
            <ScheduleTable schedule={schedule} groups={selectedGroups} />
          </Col>
        </Row>
      </Section>
    </>
  );
};
