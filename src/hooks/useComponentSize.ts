/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface WidowSize {
  width?: number;
  height?: number;
}

interface Props {
  ref: any;
}

export const useComponentSize = ({ ref }: Props) => {
  const [componentSize, setComponentSize] = useState<WidowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setComponentSize({
        width: ref?.current?.offsetWidth,
        height: ref?.current?.offsetHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return componentSize;
};
