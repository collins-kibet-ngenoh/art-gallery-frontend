import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => setData(response.data))
      .catch(error => setError(error));
  }, [url]);

  return { data, error };
};
