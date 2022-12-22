import "./index.scss";

import { CheckOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";

import { useCompoundProps } from "../../../common/hooks/useCompoundProps";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";

export interface ICheckboxProps<T extends any = unknown>
  extends Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">> {
  radio?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, value?: string | number, ctx?: T) => void;
  title?: string;
  value?: string | number;
  ctx?: T;
}

interface ICheckboxStatic {
  Box: (props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null;
  Active: (props: PropsWithChildren) => null;
  UnActive: (props: PropsWithChildren) => null;
  Title: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Button: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Group: typeof CheckboxGroup;
  RadioGroup: typeof RadioGroup;
}

export const Checkbox: FC<PropsWithChildren<ICheckboxProps>> &
  ICheckboxStatic = ({
  radio,
  disabled,
  children,
  title,
  className,
  style,
  onChange,
  checked,
  value,
  ctx,
  ...rest
}) => {
  const innerProps = useCompoundProps(
    { children },
    Checkbox,
    "Box",
    "Active",
    "UnActive",
    "Title",
    "Button",
  );

  const onToggle = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (radio) {
        if (!checked) {
          onChange?.(true, value, ctx);
        }
      } else {
        onChange?.(!checked, value, ctx);
      }
    },
    [radio, checked, onChange, value, ctx],
  );

  return (
    <div
      style={style}
      {...rest}
      className={classNames(
        "checkbox-wrap",
        { ["checkbox-button"]: !!innerProps.button },
        {
          ["checkbox-button__active"]: !!innerProps.button && checked,
        },
        className,
      )}
      onClick={onToggle}
    >
      {!innerProps.button && (
        <div
          {...innerProps.box}
          className={classNames(
            "checkbox",
            {
              ["checkbox__active"]: checked,
            },
            innerProps.box?.className,
          )}
        >
          {checked
            ? innerProps.active?.children ?? <CheckOutlined />
            : innerProps.unActive?.children}
        </div>
      )}
      {(innerProps.title?.children || title) && (
        <div
          {...innerProps.title}
          className={classNames("checkbox-title", innerProps.title?.className)}
        >
          {innerProps.title?.children ?? title}
        </div>
      )}
    </div>
  );
};

Checkbox.Box = (_p: ComponentProps<typeof Checkbox.Box>) => null;
Checkbox.Active = (_p: ComponentProps<typeof Checkbox.Active>) => null;
Checkbox.UnActive = (_p: ComponentProps<typeof Checkbox.UnActive>) => null;
Checkbox.Title = (_p: ComponentProps<typeof Checkbox.Title>) => null;
Checkbox.Button = (_p: ComponentProps<typeof Checkbox.Button>) => null;
Checkbox.Group = CheckboxGroup;
Checkbox.RadioGroup = RadioGroup;
