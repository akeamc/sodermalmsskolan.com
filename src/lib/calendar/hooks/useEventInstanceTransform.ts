import { useEffect, useRef, useState } from "react";
import CalendarEventInstance from "../event/CalendarEventInstance";

const useEventInstanceTransform = <T>(
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

export default useEventInstanceTransform;
