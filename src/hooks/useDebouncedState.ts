import { useEffect, useState } from "react";

export const useDebouncedState = <T>(incValue: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(incValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [incValue]);

  return debouncedValue;
};
