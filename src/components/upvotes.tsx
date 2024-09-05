import { CardDescription } from "./ui/card";
import arrow from "@/assets/up.svg";

interface UpvotesProps {
  upvotes: number;
}

const Upvotes = ({ upvotes }: UpvotesProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <img src={arrow} alt="arrow up" className="size-3 object-contain" />
      <CardDescription>{upvotes}</CardDescription>
    </div>
  );
};
export default Upvotes;
