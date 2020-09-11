import { useEffect, useState } from "react";

function getTime(): Date {
  return new Date();
}

export const useTime = (refreshCycle = 100) => {
  const [now, setNow] = useState(getTime);

  useEffect(() => {
    const intervalId = setInterval(() => setNow(getTime()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [refreshCycle, setInterval, clearInterval, setNow, getTime()]);

  return now;
};
