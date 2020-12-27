import { useMemo } from "react";
import { CHOICES } from "../choice";
import { useScheduleContext } from "../options";
import Period from "../period";
import useChanges from "./useChanges";

const usePeriods = (): Period[] => {
  const [{ selectedCollections }] = useScheduleContext();

  const initialPeriods: Period[] = CHOICES.reduce((total, { id, collections }) => {
    const selectedCollection = collections
      .find(({ id: collectionId }) => collectionId === selectedCollections[id]);

    return total.concat(selectedCollection.periods);
  }, []);

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
        clone.note = change.note || clone.note;
      }

      return clone;
    });
  }, [initialPeriods, changes]);

  return periods;
};

export default usePeriods;
