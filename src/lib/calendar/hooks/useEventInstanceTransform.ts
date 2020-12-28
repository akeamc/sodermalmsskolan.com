import { useEffect, useRef, useState } from "react";
import { CalendarEventInstance, getInstanceArrayId } from "../event";

const useEventInstanceTransform = <T>(
  eventInstances: CalendarEventInstance[],
  callback: () => T,
  initialValue?: T,
): T => {
  const prevKeyRef = useRef<string>(null);

  const [output, setOutput] = useState<T>(initialValue);

  useEffect(() => {
    const key = getInstanceArrayId(eventInstances);

    if (prevKeyRef.current === key) {
      return;
    }

    prevKeyRef.current = key;

    const newOutput = callback();

    setOutput(newOutput);
  }, [callback, eventInstances]);

  return output;
};

export default useEventInstanceTransform;
