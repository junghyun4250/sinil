import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { reserveRoom, reserveRoomCnt } from "./module/reservationSlice";
import MyCalendar from "../calendar/calendarModal";

const ReservationInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); // 2번 라인
  const { roomData } = state;
  const isReserved = useSelector((state) => state.reservation.isReserved);
  const totalResCnt = useSelector((state) => state.reservation.totalResCnt);

  return (
    <>
      <div className="reservation-Info-wrap">
        <div className="reservation-Info-header">
          <span>예약 정보</span>
        </div>
        <div className="reservation-Info-body"></div>
      </div>
    </>
  );
};

export default ReservationInfo;
