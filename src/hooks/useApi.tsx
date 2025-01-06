import { useState } from "react";
import toast from "react-hot-toast";

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
    // const statusCode = response.status;
    if (!response.ok) {
      // statusCode !== HttpStatusCode.UnprocessableEntity &&
      toast.error(response.payload.errors || response.payload.message);
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
