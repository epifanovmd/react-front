import "./index.scss";

import classNames from "classnames";
import React, { FC, PropsWithChildren } from "react";

import { ContextItem, IContextItemProps } from "../../common";

export interface IButtonProps<T extends any = unknown>
  extends Partial<IContextItemProps<T>> {
  title?: string;
  disabled?: boolean;
}

export const Button: FC<PropsWithChildren<IButtonProps>> = ({
  disabled,
  children,
  title,
  className,
  ...rest
}) => {
  return (
    <ContextItem
      className={classNames(
        "button",
        { ["button__disabled"]: disabled },
        className,
      )}
      {...rest}
      ctx={rest.ctx}
    >
      {title || children}
    </ContextItem>
  );
};
