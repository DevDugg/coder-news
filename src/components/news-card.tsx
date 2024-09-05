import { Link } from "react-router-dom";
import { Story } from "@/lib/models";
import { routes } from "@/routes";
import useFetch from "@/hooks/use-fetch";

interface NewsCardProps {
  storyId: number;
}

const NewsCard = ({ storyId }: NewsCardProps) => {
  const { data, loading, error } = useFetch<Story>(routes.item(String(storyId)));
  return (
    <Link to={`/news/${storyId}`} className="news-card bg-white shadow rounded-md flex flex-col gap-4 p-4">
      <h2 className="text-lg">{data?.title}</h2>
    </Link>
  );
};
export default NewsCard;
