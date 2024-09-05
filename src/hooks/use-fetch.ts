import { useCallback, useEffect, useState } from "react";

import buildApiLink from "@/lib/build-api-link";
import { useInView } from "react-intersection-observer";

interface UseFetchProps {
  path: string;
  lazy?: boolean;
  refresh?: number;
}

const useFetch = <Model>({ path, lazy = false, refresh }: UseFetchProps) => {
  const [data, setData] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const url = buildApiLink(path);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: !lazy,
    fallbackInView: true,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setHasFetched(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!lazy || (lazy && inView && !hasFetched)) {
      fetchData();
    }

    let interval: NodeJS.Timeout;
    if (refresh && (!lazy || (lazy && hasFetched))) {
      interval = setInterval(fetchData, refresh * 1000);
    }

    return () => clearInterval(interval);
  }, [inView, lazy, refresh, fetchData, hasFetched]);

  return { data, loading, error, ref, refresh: fetchData };
};

export default useFetch;
