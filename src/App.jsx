import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Reservation from "./pages/reservation/reservation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
