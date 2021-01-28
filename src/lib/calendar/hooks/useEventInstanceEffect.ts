import { useEffect, useRef, useState } from "react";
import CalendarEventInstance from "../event/CalendarEventInstance";

/**
 * Function used to memoize an expensive computation, and only re-run it if the
 * `CalendarEventInstance` array changes.
 *
 * @param {CalendarEventInstance[]} eventInstances The event instances.
 * @param {Function} callback The expensive callback.
 * @param {any} initialValue Optionally initial value (this function is not asynchronous).
 *
 * @returns {any} The result of the operation.
 */
const useEventInstanceEffect = <T>(
  eventInstances: CalendarEventInstance[],
  callback: () => T,
  initialValue?: T,
): T => {
  const prevSignatureRef = useRef<string>(null);

  const [output, setOutput] = useState<T>(initialValue);

  useEffect(() => {
    const signature = eventInstances.map((eventInstance) => eventInstance.signature).join(",");

    if (prevSignatureRef.current === signature) {
      return;
    }

    prevSignatureRef.current = signature;

    const newOutput = callback();

    setOutput(newOutput);
  }, [callback, eventInstances]);

  return output;
};

export default useEventInstanceEffect;
