import { useMemo } from "react";
import { CHOICES } from "../choice";
import Period from "../period";
import useChanges from "./useChanges";

const usePeriods = (): Period[] => {
  const periods = useMemo(() => CHOICES.reduce((total, choice) => {
    choice.collections.forEach(({ periods: collectionPeriods }) => {
      total.push(...collectionPeriods);
    });

    return total;
  }, []), []);

  const changes = useChanges();

  return useMemo(() => {
    if (!changes || !periods) {
      return null;
    }

    return periods.map((period) => {
      const clone = period;

      const change = changes.find(({ periodId }) => periodId === period.id);

      if (change) {
        clone.canceled = change.canceled;
        clone.note = change.note || clone.note;
      }

      return clone;
    });
  }, [periods, changes]);
};

export default usePeriods;
