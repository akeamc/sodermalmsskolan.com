import Period from "../Period";

/**
 * Returns the periods.
 *
 * @returns {Period[]} The periods.
 */
const usePeriods = (): Period[] => [
  new Period(0, 8, 25, 60, "english", "A307"),
  new Period(0, 9, 45, 75, "math", "A311"),
  new Period(0, 11, 10, 75, "socialStudies", "A309"),
  new Period(0, 13, 15, 70, "swedish", "A308"),
  new Period(1, 8, 25, 65, "math", "A311"),
  new Period(1, 9, 50, 50, "sports", "B501"),
  new Period(1, 13, 10, 65, "swedish", "A308"),
  new Period(2, 8, 20, 55, "science", "A417"),
  new Period(2, 9, 25, 50, "math", "A311"),
  new Period(2, 10, 20, 50, "swedish", "A308"),
  new Period(2, 11, 20, 65, "socialStudies", "A309"),
  new Period(2, 13, 15, 50, "english", "A307"),
  new Period(3, 9, 35, 100, "engineering", "A417"),
  new Period(3, 11, 25, 55, "math", "A311"),
  new Period(3, 13, 5, 50, "socialStudies", "A309"),
  new Period(4, 13, 0, 110, "art", "A302"),
  new Period(4, 14, 55, 50, "science", "A417"),
];

export default usePeriods;
