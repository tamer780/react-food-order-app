import { useCallback, useEffect, useState } from "react";

async function sentHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData?.message || "Something went wrong!");
  }

  return resData;
}

export function useFetch(url, initialValue, config) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setLoading(true);

      setError(null);

      try {
        const resData = await sentHttpRequest(url, {
          ...config,
          body: data ? JSON.stringify(data) : null,
          headers: data
            ? { ...config?.headers, "Content-Type": "application/json" }
            : config?.headers,
        });

        setData(resData);
      } catch (error) {
        setError({ message: error.message || "Something went wrong!" });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [url, config],
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    loading,
    setData,
    sendRequest,
  };
}
