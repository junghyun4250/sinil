import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  reserveRoom,
  reserveRoomCnt,
} from "../reservation/module/reservationSlice";

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); // 2번 라인
  const { roomData } = state;
  const isReserved = useSelector((state) => state.reservation.isReserved);
  const totalResCnt = useSelector((state) => state.reservation.totalResCnt);

  // 전체 예약자 수
  useEffect(() => {
    dispatch(reserveRoomCnt());
    console.log("roomName = ", roomData.roomName);
    console.log("roomId = ", roomData.roomId);
  }, [isReserved, roomData]);

  const test = useCallback(() => {
    console.log(process.env.REACT_APP_SETUPPROXY_URL);
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedTime = moment(date).format("hh:mm");
    const param = {
      resPerson: "황정현",
      resContact: "010-1234-1234",
      resDate: formattedDate,
      pasture: "2목장",
      resTime: formattedTime,
      roomName: "나눔관",
    };
    dispatch(reserveRoom(param));
  });
  return (
    <>
      <p>{roomData.roomName}</p>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <p>roomId = {roomData.roomId}</p>
    </>
  );
};

export default Reservation;
