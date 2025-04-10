import { useState } from "react";

const useFetchHook = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hookFunc = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await cb(options, ...args);
      setData(resp);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {data,error,loading,hookFunc}
};

export default useFetchHook;
