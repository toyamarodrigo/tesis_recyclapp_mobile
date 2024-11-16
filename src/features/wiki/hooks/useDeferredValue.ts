import { useEffect } from "react";

import { useState } from "react";

export const useDeferredValue = (value: string, delay: number) => {
  const [deferredValue, setDeferredValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeferredValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return deferredValue;
};