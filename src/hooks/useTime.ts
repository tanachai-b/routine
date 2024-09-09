import { useEffect, useState } from "react";
import { getTime } from "src/common-functions";

export function useTime() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(getTime());
    const intervalId = setInterval(() => setTime(getTime()), 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return { time };
}
