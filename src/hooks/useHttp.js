import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchFn();
        setData(data);
      } catch (error) {
        setIsError({ message: error.message || "Failed to fetch Data!" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [fetchFn]);

  return {
    isError,
    isLoading,
    data,
    setData,
  };
}
