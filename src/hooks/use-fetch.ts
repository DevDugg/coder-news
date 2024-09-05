import { useEffect, useState } from "react";

import buildApiLink from "@/lib/build-api-link";
import { useInView } from "react-intersection-observer";

interface UseFetchOptions {
  lazy?: boolean;
}

const useFetch = <Model>(path: string, options: UseFetchOptions = {}) => {
  const { lazy = false } = options;
  const [data, setData] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    fallbackInView: !lazy,
  });

  const url = buildApiLink(path);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy) {
      fetchData();
    } else if (inView) {
      fetchData();
    }
  }, [inView, url, lazy]);

  return { data, loading, error, ref: lazy ? ref : null };
};

export default useFetch;
