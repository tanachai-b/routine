import { RefObject, useEffect, useState } from "react";

export function useDivSize(ref: RefObject<HTMLDivElement>) {
  const [size, setSize] = useState<{ width: number; height: number; x: number; y: number }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (ref.current == null) return;

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref.current]);

  function onResize(entries: ResizeObserverEntry[]) {
    setSize(entries[0].target.getBoundingClientRect());
  }

  return size;
}
