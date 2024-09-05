import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";
import Story from "./pages/story";
import useScrollToTop from "./hooks/use-scroll-to-top";

function App() {
  // Function to scroll to top every time the user navigates to a new page
  useScrollToTop();

  return (
    <div className="app font-inter bg-lightgray min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Story />} />
      </Routes>
    </div>
  );
}

export default App;
