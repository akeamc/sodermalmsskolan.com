import { useMemo } from "react";
import { CHOICES } from "../choice";
import { useScheduleContext } from "../options";
import Period from "../Period";
import universalPeriods from "../universalPeriods";
import useChanges from "./useChanges";

/**
 * React hook used to filter the periods based on user preference.
 *
 * @returns {Period[]} The filtered periods.
 */
const usePeriods = (): Period[] => {
  const [{ selectedCollections }] = useScheduleContext();

  const initialPeriods: Period[] = CHOICES.reduce((total, { id, collections }) => {
    const selectedCollection = collections
      .find(({ id: collectionId }) => collectionId === selectedCollections[id]);

    return total.concat(selectedCollection.periods);
  }, []).concat(universalPeriods);

  const changes = useChanges();

  const periods = useMemo(() => {
    if (!changes || !initialPeriods) {
      return null;
    }

    return initialPeriods.map((period) => {
      const clone = period;

      const change = changes.find(({ periodId }) => periodId === period.id);

      if (change) {
        clone.canceled = change.canceled;
        clone.note = change.note ?? clone.note;

        if (change.newStart) {
          clone.deltaStart = change.newStart / 60 - clone.totalMinutes;
        }

        if (change.newEnd) {
          const newEnd = (change.newEnd) / 60 - (clone.totalMinutes + (clone.deltaStart ?? 0));

          clone.deltaDuration = newEnd - clone.duration;
        }
      }

      return clone;
    });
  }, [initialPeriods, changes]);

  return periods;
};

export default usePeriods;
