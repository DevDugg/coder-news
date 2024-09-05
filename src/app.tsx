import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";
import Story from "./pages/story";

function App() {
  return (
    <div className="app font-inter bg-gray min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Story />} />
      </Routes>
    </div>
  );
}

export default App;
