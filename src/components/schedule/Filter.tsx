import React, { FunctionComponent } from "react";
import Select from "react-select";
import { CHOICES } from "../../lib/schedule/choice";
import { useScheduleContext } from "../../lib/schedule/options";

const ScheduleFilter: FunctionComponent = () => {
  const [options, setOptions] = useScheduleContext();

  return (
    <div css={{
      marginBottom: "2rem",
    }}
    >
      <div css={{
        display: "flex",
        margin: "-1rem",
        flexWrap: "wrap",
      }}
      >
        {CHOICES.map(({ id: choiceId, collections }) => {
          const selectedId = options.selectedCollections[choiceId];

          const selected = collections.find(({ id: collectionId }) => collectionId === selectedId);

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
                value={{
                  label: selected.fullName,
                  value: selected.id,
                }}
                onChange={({ value }: { value: string; label: string }) => setOptions({
                  ...options,
                  selectedCollections: {
                    ...options.selectedCollections,
                    [choiceId]: value,
                  },
                })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleFilter;
