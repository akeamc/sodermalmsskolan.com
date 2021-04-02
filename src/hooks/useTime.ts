import { DateTime } from "luxon";
import { useEffect, useState } from "react";

/**
 * Hook used to fetch the time in a regular interval.
 *
 * @param {number} refreshCycle How often to update the time, in milliseconds.
 * @param {Function} getTime Function used to get time.
 *
 * @returns {DateTime} The date.
 */
const useTime = (
  refreshCycle = 1000,
  getTime: () => DateTime = () => DateTime.now(),
): DateTime => {
  const [time, setTime] = useState<DateTime>(getTime);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTime()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [getTime, refreshCycle, setTime]);

  return time;
};

export default useTime;
