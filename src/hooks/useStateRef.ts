import { useCallback, useRef } from "react";

export function useStateRef<T>(initialValue: T) {
  const ref = useRef<T>(initialValue);

  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === "function") {
      // @ts-ignore handle function updater
      ref.current = newValue(ref.current);
    } else {
      ref.current = newValue;
    }
  }, []);

  return [ref.current, setValue] as const;
}
