import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { type Story as StoryType } from "@/lib/models";
import { routes } from "@/routes";
import { Link, useParams } from "react-router-dom";
import left from "@/assets/left.svg";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/spinner";
import formatUnixTime from "@/lib/format-unix-time";
import Upvotes from "@/components/upvotes";

const Story = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch<StoryType>({ path: routes.item(String(id)) });
  return (
    <main className="story">
      <div className="container flex justify-center">
        <div className="flex flex-col w-1/2 bg-white h-screen p-10">
          <div className="text-lg">
            <Button variant={"link"}>
              <Link to={"/"} className="flex gap-2 items-center">
                <img src={left} alt="arrow left" className="size-6" />
                <span>Back</span>
              </Link>
            </Button>
            {loading && (
              <div className="flex justify-center pt-10">
                <div className="py-10">
                  <Spinner />
                </div>
              </div>
            )}
            {error && (
              <div>
                <CardDescription className="text-red py-4">Error: {error}</CardDescription>
              </div>
            )}
            {data && (
              <div className="py-10 flex flex-col gap-6">
                <CardTitle>{data.title}</CardTitle>
                <div className="flex justify-between">
                  <CardDescription>{formatUnixTime(data.time)}</CardDescription>
                  <Upvotes upvotes={data.score} />
                </div>
                <Button variant={"link"} className="w-fit">
                  <a href={data.url} rel="noopener noreferrer">
                    Read full article
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Story;
