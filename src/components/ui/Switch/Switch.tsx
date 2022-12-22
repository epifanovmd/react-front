import React, {
  ComponentProps,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import RSwitch, { ReactSwitchProps } from "react-switch";

import { useCompoundProps } from "../../../common/hooks/useCompoundProps";

export interface ISwitchProps
  extends ReactSwitchProps,
    Omit<
      React.HTMLAttributes<HTMLInputElement>,
      | "onFocus"
      | "onBlur"
      | "onKeyUp"
      | "onChange"
      | "ref"
      | keyof ReactSwitchProps
    > {}

interface ISwitchStatic {
  Active: (props: { children: JSX.Element }) => null;
  UnActive: (props: { children: JSX.Element }) => null;
  HandleActive: (props: { children: JSX.Element }) => null;
  HandleUnActive: (props: { children: JSX.Element }) => null;
}

export const Switch: ForwardRefExoticComponent<
  PropsWithoutRef<Partial<ISwitchProps>> & RefAttributes<RSwitch>
> &
  ISwitchStatic = forwardRef<RSwitch, Partial<ISwitchProps>>(
  ({ checked, onChange, children, ...rest }, ref) => {
    const innerProps = useCompoundProps(
      { children, checked, onChange },
      Switch,
      "Active",
      "UnActive",
      "HandleActive",
      "HandleUnActive",
    );

    return (
      <RSwitch
        ref={ref}
        checked={checked || false}
        onChange={onChange || (() => null)}
        {...rest}
        uncheckedIcon={rest.uncheckedIcon ?? innerProps.unActive?.children}
        checkedIcon={rest.checkedIcon ?? innerProps.active?.children}
        uncheckedHandleIcon={
          rest.uncheckedHandleIcon ?? innerProps.handleUnActive?.children
        }
        checkedHandleIcon={
          rest.checkedHandleIcon ?? innerProps.handleActive?.children
        }
      />
    );
  },
) as any;

Switch.Active = (_p: ComponentProps<typeof Switch.Active>) => null;
Switch.UnActive = (_p: ComponentProps<typeof Switch.UnActive>) => null;
Switch.HandleActive = (_p: ComponentProps<typeof Switch.HandleActive>) => null;
Switch.HandleUnActive = (_p: ComponentProps<typeof Switch.HandleUnActive>) =>
  null;
