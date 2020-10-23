import { useEffect, useState } from "react";

function getTime(): Date {
  return new Date();
}

export const useTime = (refreshCycle = 100): Date => {
  const [now, setNow] = useState<Date>(getTime);

  useEffect(() => {
    const intervalId = setInterval(() => setNow(getTime()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [refreshCycle, setInterval, clearInterval, setNow, getTime()]);

  return now;
};
