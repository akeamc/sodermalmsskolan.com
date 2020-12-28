import React, { FunctionComponent, useEffect, useState } from "react";
import Select from "react-select";
import PeriodChoice from "../../../lib/schedule/choice";
import { useScheduleContext } from "../../../lib/schedule/options";

export interface SelectOption {
  value: string;
  label: string;
}

const FilterCategory: FunctionComponent<{
  choice: PeriodChoice;
}> = ({ choice }) => {
  const [options, setOptions] = useScheduleContext();
  const [value, setValue] = useState<SelectOption>();

  const { collections } = choice;

  useEffect(() => {
    const selectedId = options.selectedCollections[choice.id];
    const selected = collections.find(({ id }) => id === selectedId);

    setValue({
      label: selected.fullName,
      value: selected.id,
    });
  }, [choice, collections, options.selectedCollections]);

  return (
    <div css={{
      flex: "1 0 8rem",
      margin: "1rem",
    }}
    >
      <Select
        options={collections.map(({ fullName, id: collectionId }) => ({
          label: fullName,
          value: collectionId,
        }))}
        value={value}
        instanceId={choice.id}
        onChange={({ value: newValue }: SelectOption) => {
          setOptions({
            ...options,
            selectedCollections: {
              ...options.selectedCollections,
              [choice.id]: newValue,
            },
          });
        }}
        isSearchable={false}
      />
    </div>
  );
};

export default FilterCategory;
