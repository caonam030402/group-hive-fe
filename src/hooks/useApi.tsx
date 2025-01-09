import { useState } from "react";

interface IUseFetch<T> {
  fn: Promise<T>;
  onSuccess?: (response: T) => void;
  onError?: (response: T) => void;
}

export default function useApi() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  async function fetch<T>({ fn, onError, onSuccess }: IUseFetch<T>) {
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

  return { fetch, isLoading, setIsLoading };
}
