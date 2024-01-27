import { useEffect, useState } from 'react';

interface UseFetchOptions {
  // Define options as needed
}

interface UseFetchResponse<T> {
  response: T | null;
  error: Error | null;
  isLoading: boolean;
  abort: () => void;
}

const useFetch = <T>(url: string, options?: UseFetchOptions): UseFetchResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setAbortController(abortController);

    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const res = await fetch(url, { ...options, signal: abortController.signal });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json() as T;
        setResponse(json);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchData();

    return () => {
      abortController?.abort();
    };
  }, [url, options]);

  const abort = () => {
    abortController?.abort();
  };

  return { response, error, isLoading, abort };
};

export default useFetch;
