import "./index.scss";

import RCDrawer, { DrawerProps } from "rc-drawer";
import React, { FC, PropsWithChildren } from "react";

export interface IDrawerProps extends DrawerProps {}

export const Drawer: FC<PropsWithChildren<IDrawerProps>> = props => {
  return <RCDrawer {...props} />;
};
