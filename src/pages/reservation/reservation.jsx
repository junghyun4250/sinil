import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { reserveRoom } from "../reservation/module/reservationSlice";
import MyCalendar from "../calendar/calendarModal";
import ReservationInfo from "./reservationInfo";

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); // 2번 라인
  const { roomData } = state;
  const isReserved = useSelector((state) => state.reservation.isReserved);
  const monthData = useSelector((state) => state.reservation.monthData);
  const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-header">
          <span>시간 예약</span>
        </div>
        <MyCalendar
          isModal={false}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          roomData={roomData}
        />
        <ReservationInfo
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          roomData={roomData}
        />
      </div>
    </>
  );
};

export default Reservation;
