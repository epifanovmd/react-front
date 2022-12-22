import type { ReactElement } from "react";
import React from "react";
import type { GroupBase } from "react-select";
import ReactSelect, { createFilter, Props } from "react-select";

type TCustomSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  isError?: boolean;
  multiSelectedItemsLimit?: number;
};

export type ISelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = TCustomSelectProps<Option, IsMulti, Group>;

export function Select<
  OptionType = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  components,
  styles,
  isError = false,
  maxMenuHeight = 200,
  noOptionsMessage,
  ...props
}: ISelectProps<OptionType, IsMulti, Group>): ReactElement {
  return (
    <ReactSelect
      classNamePrefix={"select"}
      styles={styles}
      filterOption={createFilter({ ignoreAccents: false })}
      maxMenuHeight={maxMenuHeight}
      components={components}
      {...props}
    />
  );
}
