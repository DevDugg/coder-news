import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";

function App() {
  return (
    <div className="app font-inter bg-gray min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
