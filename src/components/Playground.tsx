import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { EyeOutlined } from "@ant-design/icons";

export const Playground: FC = observer(() => {
  return (
    <div style={{ paddingBottom: 200 }}>
      <EyeOutlined />
    </div>
  );
});
