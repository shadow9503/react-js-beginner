import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
