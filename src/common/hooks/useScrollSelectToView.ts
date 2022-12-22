import { useEffect, useRef } from "react";

import { useScrollIntoView } from "./useScrollIntoView";

export const useScrollSelectToView = (isSelected: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToView = useScrollIntoView(ref);

  useEffect(() => {
    if (isSelected) {
      scrollToView({ block: "nearest" });
    }
  }, [isSelected, scrollToView]);

  return ref;
};
