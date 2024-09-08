import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  function onWindowResize() {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }

  return size;
}
