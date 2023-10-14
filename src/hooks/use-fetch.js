import { useState, useEffect, useCallback } from "react";
const BASE_URL = "https://reqres.in/api/";

const useFetch = (url, dataHandler) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback(
    (options = {}) => {
      setIsLoading(true);
      setResponse(null);
      setOptions(options);
    },
    [setResponse, setOptions]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) return;
      const res = await fetch(`${BASE_URL}${url}`, options);

      const status = res.status;
      if (status === 401) {
        const { message: errMsg } = await res.json();
        throw new Error(errMsg);
      } else if (status === 400) {
        const { message: errMsg } = await res.json();
        throw new Error(errMsg);
      } else if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      setResponse(data);
      dataHandler && dataHandler(data);
      setIsLoading(false);
    };
    fetchData().catch((err) => {
      setError(err.message);
      dataHandler && dataHandler(err.message);
      setIsLoading(false);
    });
  }, [url, options, isLoading, dataHandler]);

  return [{ response, error, isLoading }, doFetch];
};

export default useFetch;
