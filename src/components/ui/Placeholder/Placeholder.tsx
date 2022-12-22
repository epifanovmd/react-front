import "./index.scss";

import classNames from "classnames";
import React, { ComponentProps, FC } from "react";

import { useCompoundProps } from "../../../common/hooks/useCompoundProps";

export interface IPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isFocus?: boolean;
  placeholder?: string;
  cnPrefix?: string;
}

interface IPlaceholderStatic {
  Active: (props: IPlaceholderProps) => null;
}

export const Placeholder: FC<IPlaceholderProps> & IPlaceholderStatic = ({
  children,
  isFocus,
  placeholder,
  cnPrefix,
  ...rest
}) => {
  const innerProps = useCompoundProps({ children }, Placeholder, "Active");

  return (
    <div
      {...rest}
      {...(isFocus ? innerProps.active : ({} as any))}
      className={classNames(
        "placeholder",
        { ["placeholder__focus"]: isFocus },
        {
          [`${innerProps.active?.className || ""}`]:
            isFocus && innerProps.active?.className,
        },
      )}
    >
      {placeholder}
    </div>
  );
};

Placeholder.Active = (_p: ComponentProps<typeof Placeholder.Active>) => null;
