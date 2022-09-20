import { useState } from 'react';
import { useEffect } from 'react';

// CUSTOM HOOK FOR MORE SMOOTH FETCHING - ALLOWS FOR LOADING

export const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url, {
      method: method,
      body: body,
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);
  return [data, loading, setData];
};
