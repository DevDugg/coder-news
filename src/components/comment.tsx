import useFetch from "@/hooks/use-fetch";
import Spinner from "./spinner";
import { Button } from "./ui/button";
import { CardDescription } from "./ui/card";
// Renamed this because conflicts with this component's name
import { type Comment as CommentType } from "@/lib/models";
import { useState } from "react";
import { routes } from "@/routes";

interface CommentProps {
  id: number;
  depth?: number;
}

const Comment = ({ id, depth = 0 }: CommentProps) => {
  const { data, loading, error, ref } = useFetch<CommentType>({ path: routes.item(String(id)), lazy: depth !== 0 });
  const [showReplies, setShowReplies] = useState(false);

  const handleLoadReplies = () => {
    setShowReplies(!showReplies);
  };

  const renderReplies = (replyIds: number[]) => {
    return replyIds.map((replyId) => <Comment key={replyId} id={replyId} depth={depth + 1} />);
  };

  return (
    <div className={`comment py-4 my-4 border-l-2 border-gray px-6 ${depth > 0 ? "ml-4" : ""}`} ref={ref}>
      {loading && (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      )}
      {error && (
        <div>
          <CardDescription className="text-red py-4">Error: {error}</CardDescription>
        </div>
      )}
      {data && !loading && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-xs">
            <CardDescription>{data.by}</CardDescription>
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: data.text }} />
          </div>
          {data.kids && (
            <>
              <Button variant={"link"} className="w-fit px-0" onClick={handleLoadReplies}>
                {showReplies ? "Hide replies" : "Load replies"}
              </Button>
            </>
          )}
          {showReplies && data.kids && depth < 5 && renderReplies(data.kids)}
        </div>
      )}
    </div>
  );
};

export default Comment;
