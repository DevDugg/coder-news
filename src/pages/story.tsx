import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
// Renamed this because conflicts with this component's name
import { type Story as StoryType } from "@/lib/models";
import { routes } from "@/routes";
import { Link, useParams } from "react-router-dom";
import left from "@/assets/left.svg";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/spinner";
import formatUnixTime from "@/lib/format-unix-time";
import Upvotes from "@/components/upvotes";
import Comment from "@/components/comment";

const Story = () => {
  const { id } = useParams();

  const { data, loading, error, refresh } = useFetch<StoryType>({ path: routes.item(String(id)) });
  return (
    <main className="story">
      <div className="container flex justify-center">
        <div className="flex flex-col w-[70%] bg-white min-h-screen p-10">
          <div className="text-lg">
            <Button variant={"link"} className="px-0">
              <Link to={"/"} className="flex gap-2 items-center">
                <img src={left} alt="arrow left" className="size-4" />
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
            {data && !loading && (
              <div className="py-10 flex flex-col gap-6">
                <CardTitle>{data.title}</CardTitle>
                <div className="flex justify-between">
                  <CardDescription>{formatUnixTime(data.time)}</CardDescription>
                  <Upvotes upvotes={data.score} />
                </div>
                <Button variant={"link"} className="w-fit px-0">
                  <a href={data.url} rel="noopener noreferrer">
                    Read full article
                  </a>
                </Button>
                <div className="flex justify-between items-center">
                  <CardDescription>{data.descendants === 0 ? "No" : data.descendants} comment(s)</CardDescription>
                  <Button onClick={refresh} disabled={!data || loading}>
                    Refresh
                  </Button>
                </div>
                <ul className="flex flex-col gap-4">
                  {data.kids &&
                    data.kids.map((commentId: number) => (
                      <li key={commentId}>
                        <Comment id={commentId} />
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Story;
