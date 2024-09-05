import NewsCard from "./news-card";
import { routes } from "@/routes";
import useFetch from "@/hooks/use-fetch";

const LatestNews = () => {
  const { data, loading, error } = useFetch<any>(routes.newStories);
  return (
    <section className="latest" id="latest">
      <div className="container">
        <ul className="flex flex-col gap-4 items-center">
          {/* {data?.slice(0, 10).map((storyId: number) => (
            <li key={storyId} className="w-1/2">
              <a href={`/item/${storyId}`} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-100">
                <h2 className="font-grotesk font-bold text-xl">{storyId}</h2>
              </a>
            </li>
          ))} */}
          {data?.slice(0, 100).map((storyId: number) => (
            <li key={storyId} className="w-1/2">
              <NewsCard storyId={storyId} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default LatestNews;
