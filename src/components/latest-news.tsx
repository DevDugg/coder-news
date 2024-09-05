import { Card, CardDescription } from "./ui/card";

import { Button } from "./ui/button";
import NewsCard from "./news-card";
import Spinner from "./spinner";
import { routes } from "@/routes";
import useFetch from "@/hooks/use-fetch";

const LatestNews = () => {
  const { data, loading, error, refresh } = useFetch<any>({ path: routes.newStories, refresh: 60 });
  return (
    <section className="latest h-full" id="latest">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center items-center pt-10">
          <Button onClick={refresh} disabled={loading}>
            Refresh
          </Button>
        </div>
        {loading && (
          <div className="flex justify-center pt-10">
            <Card className="flex items-center justify-center w-1/2 py-10">
              <Spinner />
            </Card>
          </div>
        )}
        {error && (
          <Card>
            <CardDescription className="text-red py-4">Error: {error}</CardDescription>
          </Card>
        )}
        {data && !loading && (
          <ul className="flex flex-col gap-4 items-center py-10">
            {data.slice(0, 100).map((storyId: number) => (
              <li key={storyId} className="w-1/2">
                <NewsCard storyId={storyId} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
export default LatestNews;
