import "./index.scss";

import RCTabs from "rc-tabs";
import { TabsProps } from "rc-tabs/es/Tabs";
import React, { forwardRef } from "react";

export interface ITabsProps extends TabsProps {}

export const Tabs = forwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
  return <RCTabs ref={ref} {...props} />;
});
