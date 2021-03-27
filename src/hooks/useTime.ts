import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

/**
 * Hook used to fetch the time in a regular interval.
 *
 * @param {number} refreshCycle How often to update the time, in milliseconds.
 * @param {Function} getTime Function used to get time.
 *
 * @returns {Dayjs} The date.
 */
const useTime = (
  refreshCycle = 1000,
  getTime: () => Dayjs = () => dayjs(),
): Dayjs => {
  const [time, setTime] = useState<Dayjs>(getTime);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTime()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [getTime, refreshCycle, setTime]);

  return time;
};

export default useTime;
