import { useCallback, useState } from "react";

interface IUseFetch<T> {
  fn: Promise<T>;
  onSuccess?: (response: T) => void;
  onError?: (response: T) => void;
}

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 1000);

  async function fetchFn<T>({ fn, onError, onSuccess }: IUseFetch<T>) {
    setIsLoading(true);
    const response: any = await fn;

    if (!response.ok) {
      setIsLoading(false);
      onError?.(response);
    } else {
      setIsLoading(false);
      onSuccess?.(response as T);
    }

    setIsLoading(false);

    return response;
  }

  const fetch = useCallback(fetchFn, []);

  return { fetch, isLoading, setIsLoading };
}
