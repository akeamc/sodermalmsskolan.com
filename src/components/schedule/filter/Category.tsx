import React, { FunctionComponent, useEffect, useState } from "react";
import Select, { SelectOption } from "../../form/Select";
import PeriodChoice from "../../../lib/schedule/choice";
import { useScheduleContext } from "../../../lib/schedule/options";

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
    <div>
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
