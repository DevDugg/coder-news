import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { Story } from "@/lib/models";
import Upvotes from "./upvotes";
import formatUnixTime from "@/lib/format-unix-time";
import { routes } from "@/routes";
import useFetch from "@/hooks/use-fetch";

interface NewsCardProps {
  storyId: number;
}

const NewsCard = ({ storyId }: NewsCardProps) => {
  const { data, loading, ref, error } = useFetch<Story>({ path: routes.item(String(storyId)), lazy: true });

  return (
    <div ref={ref}>
      {loading && (
        <Card className="flex items-center justify-center py-10">
          <Spinner />
        </Card>
      )}

      {error && (
        <Card>
          <CardDescription className="text-red py-4">Error: {error}</CardDescription>
        </Card>
      )}
      {data && (
        <Link to={`/item/${data.id}`}>
          <Card>
            <CardHeader className="flex justify-between">
              <Upvotes upvotes={data.score} />
              <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <CardDescription>
                by <span className="text-black font-bold">{data.by}</span>
              </CardDescription>
              <CardDescription>{formatUnixTime(data.time)}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <CardDescription>{data.descendants === 0 ? "No" : data.descendants} comment(s)</CardDescription>
              <Button variant={"link"} className="px-0">
                Read more
              </Button>
            </CardFooter>
          </Card>
        </Link>
      )}
    </div>
  );
};
export default NewsCard;
