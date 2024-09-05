import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header bg-black" id="header">
      <div className="container py-4">
        <Link to="/">
          <h1 className="font-grotesk font-bold text-2xl text-white uppercase text-center">CoderNews</h1>
        </Link>
      </div>
    </header>
  );
};
export default Header;
