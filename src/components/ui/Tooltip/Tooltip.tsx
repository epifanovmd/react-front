import "./index.scss";

import RCTooltip from "rc-tooltip";
import { TooltipProps } from "rc-tooltip/lib/Tooltip";
import React, { FC, PropsWithChildren } from "react";

export interface ITooltipProps extends TooltipProps {}

export const Tooltip: FC<PropsWithChildren<ITooltipProps>> = props => {
  return <RCTooltip {...props} destroyTooltipOnHide={true} />;
};
