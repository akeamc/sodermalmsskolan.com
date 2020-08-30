import { useEffect, useState } from "react";

export const useTime = (refreshCycle = 100) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), refreshCycle);

    return () => clearInterval(intervalId);
  }, [refreshCycle, setInterval, clearInterval, setNow, new Date()]);

  return now;
};
