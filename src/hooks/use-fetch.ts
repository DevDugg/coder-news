import { useEffect, useState } from "react";

import buildApiLink from "@/lib/build-api-link";

const useFetch = <Model>(path: string) => {
  const [data, setData] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const url = buildApiLink(path);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
