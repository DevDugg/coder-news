import spinner from "@/assets/spinner-ios.svg";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="Spinner" loading="eager" className="size-10 object-contain animate-spin" />
    </div>
  );
};
export default Spinner;
