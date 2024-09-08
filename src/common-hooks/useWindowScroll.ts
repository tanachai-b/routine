import { useEffect, useState } from "react";

export function useWindowScroll() {
  const [scroll, setScroll] = useState<{ scrollX: number; scrollY: number }>({
    scrollX: 0,
    scrollY: 0,
  });

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    setScroll({ scrollX: window.scrollX, scrollY: window.scrollY });
  }

  return scroll;
}
