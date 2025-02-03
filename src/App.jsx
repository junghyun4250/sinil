import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.scss';
import './pages/libs/styles/link.scss';
import RoomPick from "./pages/roomPick/roomPick";
import Reservation from "./pages/reservation/reservation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<RoomPick />} />
        <Route path={"/reservation"} element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
