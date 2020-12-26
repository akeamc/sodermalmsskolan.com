import { useMemo } from "react";
import Period from "../period";
import { SUBJECTS } from "../subject";
import useChanges from "./useChanges";

const usePeriods = (): Period[] => {
  const periods = useMemo(() => [
    new Period(0, 8, 30, 55, SUBJECTS.SCIENCE, "A415"),
    new Period(0, 9, 35, 60, SUBJECTS.ENGLISH, "A307"),
    new Period(0, 11, 5, 80, SUBJECTS.MATH, "A307"),
    new Period(0, 13, 15, 75, SUBJECTS.SOCIAL_STUDIES, "A309"),
    new Period(1, 8, 10, 50, SUBJECTS.SPORTS, "B501"),
    new Period(1, 10, 5, 65, SUBJECTS.SOCIAL_STUDIES, "A309"),
    new Period(1, 13, 10, 50, SUBJECTS.SCIENCE, "A311"),
    new Period(2, 8, 30, 50, SUBJECTS.ENGLISH, "A307"),
    new Period(2, 11, 20, 65, SUBJECTS.MATH, "A307"),
    new Period(2, 13, 10, 70, SUBJECTS.SWEDISH, "A308"),
    new Period(3, 11, 25, 65, SUBJECTS.SWEDISH, "A308"),
    new Period(3, 13, 5, 50, SUBJECTS.MATH, "A308"),
    new Period(3, 14, 20, 100, SUBJECTS.SPORTS, "Forsgrenska"),
    new Period(4, 14, 40, 50, SUBJECTS.SOCIAL_STUDIES, "A309"),
  ], []);

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
