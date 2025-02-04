import { useCallback, useRef } from "react";

export default function useNonRenderState<T>(
  initialValue: T | null = null,
): [T | null, (value: T | null) => void] {
  const ref = useRef<T | null>(initialValue);

  const getValue = ref.current;
  const setValue = useCallback((value: T | null) => {
    ref.current = value;
  }, []);

  return [getValue, setValue];
}
