import { useParams } from "react-router-dom";

const Story = () => {
  const { id } = useParams();
  return <main className="story">{id}</main>;
};
export default Story;
