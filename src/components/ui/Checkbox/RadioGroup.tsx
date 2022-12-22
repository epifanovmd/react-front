import { RequiredKeys } from "@force-dev/utils";
import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import { useCompoundProps } from "../../../common/hooks/useCompoundProps";
import { Checkbox, ICheckboxProps } from "./Checkbox";

export interface IRadioGroupProps<T extends any = unknown>
  extends Omit<ICheckboxProps, "onChange" | "defaultValue"> {
  defaultValue?: string | number;
  items: RequiredKeys<ICheckboxProps<T>, "value">[];
  onChange?: (value: string | number, ctx?: T) => void;
}

interface IRadioGroupStatic {
  Wrap: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
}

export const RadioGroup: FC<PropsWithChildren<IRadioGroupProps>> &
  IRadioGroupStatic = ({
  items,
  defaultValue,
  value,
  onChange,
  children,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState<string | number | undefined>(
    defaultValue,
  );

  const innerProps = useCompoundProps(
    {
      children,
      items,
    },
    RadioGroup,
    "Wrap",
  );

  const handleChange = useCallback(
    (_checked: boolean, _value?: string | number, ctx?: any) => {
      if (value === undefined) {
        setCurrentValue(_value);
      }
      onChange?.(_value!, ctx);
    },
    [onChange, value],
  );

  return (
    <div {...innerProps.wrap}>
      {items.map((element, index) => (
        <Checkbox
          key={String(element.value) + index}
          checked={
            value ? value === element.value : currentValue === element.value
          }
          {...element}
          {...rest}
          onChange={handleChange}
          radio={true}
        >
          {innerProps.$children}
        </Checkbox>
      ))}
    </div>
  );
};

RadioGroup.Wrap = (_p: ComponentProps<typeof RadioGroup.Wrap>) => null;
