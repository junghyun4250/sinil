import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import uuid from "react-uuid";
import sampleimg from "../libs/images/sampleImg.png";
import roomsData from "../libs/script/roomData.json";
import MyCalendar from "../calendar/calendarModal";
import logo from "../libs/images/logo.png";
import AdminLogin from "../common/adminLoginModal";

import {
  reserveRoom,
  reserveRoomCnt,
} from "../reservation/module/reservationSlice";

const RoomPick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.reservation.isAdmin);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAdminLogin, setOpenAdminLogin] = useState(false);
  const [roomData, setRoomData] = useState();
  const [adminId, setAdminId] = useState();

  useEffect(() => {
    if (isAdmin !== undefined) {
      localStorage.setItem("idx", isAdmin.idx);
      localStorage.setItem("id", isAdmin.id);
      setAdminId(isAdmin.id);
    }
  }, [isAdmin]);

  const showId = useCallback(() => {
    return <span className="admin-id">관리자: {adminId}</span>;
  }, [adminId]);

  const reserveFunc = useCallback((roomData) => {
    navigate("/reservation", { state: { roomData: roomData } });
  });

  return (
    <>
      <div className="rooms-wrap">
        <div className="rooms-header">
          <img src={logo} className="ui-li-logo" id="logo" alt="logo" />
          <div className="admin">
            {adminId ? (
              <span className="admin-id">
                관리자: {localStorage.getItem("id")}
              </span>
            ) : (
              // showId()
              <button
                className="admin-button"
                onClick={() => {
                  setOpenAdminLogin(true);
                }}
              >
                관리자
              </button>
            )}
          </div>
        </div>
        {roomsData.rooms.map((roomData, index) => (
          <div className="room-wrap" key={index}>
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
              <button
                onClick={() => {
                  setOpenCalendar(true);
                  setRoomData(roomData);
                }}
              >
                예약 현황
              </button>
            </div>
          </div>
        ))}
        {openCalendar ? (
          <MyCalendar
            isModal={true}
            setOpenCalendar={setOpenCalendar}
            roomData={roomData}
          />
        ) : null}
        {openAdminLogin ? (
          <AdminLogin setOpenAdminLogin={setOpenAdminLogin} />
        ) : null}
      </div>
    </>
  );
};

export default RoomPick;
