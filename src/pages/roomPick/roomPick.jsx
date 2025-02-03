import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import uuid from "react-uuid";
import sampleimg from "../images/sampleImg.png";
import roomsData from "../libs/script/roomData.json";

import {
  reserveRoom,
  reserveRoomCnt,
} from "../reservation/module/reservationSlice";

const RoomPick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReserved = useSelector((state) => state.reservation.isReserved);

  const reserveFunc = useCallback((roomData) => {
    navigate("/reservation", { state: { roomData: roomData } });
  });
  const reservedState = useCallback(() => {
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
      <div className="rooms-wrap">
        <div className="rooms-header">
          <span>예약</span>
          <div className="admin">
            <button className="admin" onClick={reservedState}>
              관리자 로그인
            </button>
          </div>
        </div>
        <>
          {roomsData.rooms.map((roomData) => (
            <div className="room-wrap">
              <div className="room-name">
                <span>{roomData.roomName}</span>
              </div>
              <div className="room-img">
                <img
                  src={sampleimg}
                  className="ui-li-icon"
                  id="img1"
                  alt="img1"
                />
              </div>
              <div className="room-buttons">
                <button
                  onClick={() => {
                    reserveFunc(roomData);
                  }}
                >
                  예약하기
                </button>
                <button onClick={reservedState}>예약 현황</button>
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default RoomPick;
