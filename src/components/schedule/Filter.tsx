import React, { FunctionComponent } from "react";
import { CHOICES } from "../../lib/schedule/choice";
import { useScheduleContext } from "../../lib/schedule/options";
import { fonts } from "../../styles/text";
import { SmallHeading } from "../text/headings";

interface OptionProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Option: FunctionComponent<OptionProps> = ({ name, checked, onChange }) => (
  <li css={{
    margin: "0.5rem 0",
    listStyle: "none",
  }}
  >
    <input
      id={name}
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      css={{
        verticalAlign: "middle",
      }}
    />
    <label
      htmlFor={name}
      css={{
        marginLeft: "0.25rem",
        fontSize: "0.825rem",
        fontWeight: 500,
        fontFamily: fonts.monospace,
      }}
    >
      {name}
    </label>
  </li>
);

const ScheduleFilter: FunctionComponent = () => {
  const [options, setOptions] = useScheduleContext();

  return (
    <div css={{
      display: "flex",
      margin: "-1rem",
      marginBottom: "1rem", // +1rem
      flexWrap: "wrap",
    }}
    >
      {CHOICES.map(({ title, id, collections }) => (
        <div
          key={id}
          css={{
            margin: "1rem",
          }}
        >
          <SmallHeading css={{
            marginBottom: "0.5rem",
          }}
          >
            {title}
          </SmallHeading>
          <ul css={{
            margin: 0,
            padding: 0,
          }}
          >
            {collections.map(({ name }) => (
              <Option
                key={name}
                name={name}
                checked={options.collectionFilter.includes(name)}
                onChange={(checked) => {
                  const newFilter = options.collectionFilter;

                  const index = newFilter.indexOf(name);

                  if (checked && index === -1) {
                    newFilter.push(name);
                  }

                  if (!checked && index !== -1) {
                    newFilter.splice(index, 1);
                  }

                  setOptions({
                    ...options,
                    collectionFilter: newFilter,
                  });
                }}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ScheduleFilter;
