import { useEffect, useState } from "react";

function getTime(): Date {
  return new Date();
}

/**
 * Hook used to fetch the time in a regular interval.
 * @param refreshCycle How often to update the time, in milliseconds.
 */
const useTime = (refreshCycle = 1000): Date => {
  const [time, setTime] = useState<Date>(getTime);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTime()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [refreshCycle, setTime]);

  return time;
};

export default useTime;
