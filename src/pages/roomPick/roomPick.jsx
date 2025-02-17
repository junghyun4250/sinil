import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sampleimg from "../libs/images/sampleImg.png";
import roomsData from "../libs/script/roomData.json";
import MyCalendar from "../calendar/calendarModal";
import logo from "../libs/images/logo.png";
import AdminLogin from "../common/adminLoginModal";
import { resetMonthData } from "../reservation/module/reservationSlice";

const RoomPick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.reservation.isAdmin);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAdminLogin, setOpenAdminLogin] = useState(false);
  const [roomData, setRoomData] = useState();
  const [adminId, setAdminId] = useState();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (isAdmin !== undefined) {
      localStorage.setItem("idx", isAdmin.idx);
      localStorage.setItem("id", isAdmin.id);
      setAdminId(isAdmin.id);
    }
  }, [isAdmin]);

  const reserveFunc = useCallback(
    (roomData) => {
      navigate("/reservation", { state: { roomData } });
    },
    [navigate]
  );

  const toggleGroups = (index) => {
    setSelectedRoomIndex(selectedRoomIndex === index ? null : index);
  };

  return (
    <div className="rooms-wrap">
      <div className="rooms-header">
        <img src={logo} className="ui-li-logo" id="logo" alt="logo" />
        <div className="admin">
          {adminId ? (
            <span className="admin-id">
              관리자: {localStorage.getItem("id")}
            </span>
          ) : (
            <button
              className="admin-button"
              onClick={() => setOpenAdminLogin(true)}
            >
              관리자
            </button>
          )}
        </div>
      </div>

      <div className="guide-section">
        <h2 onClick={() => setGuideOpen(!guideOpen)}>
          신일교회 장소사용 가이드 <span>{guideOpen ? "▲" : "▼"}</span>
        </h2>
        {guideOpen && (
          <ul>
            <li>1. 모든 장소는 사용 후 깨끗하게 정리해 주시길 바랍니다.</li>
            <li>
              2. 주일과 토요일에 모임이 집중됩니다. 미리 예약해 주시길 바랍니다.
            </li>
            <li>3. 장소를 사용하지 않을 때는 예약을 취소해 주세요.</li>
            <li>4. 예약 관련 문의는 담당 교역자에게 하시길 바랍니다.</li>
          </ul>
        )}
      </div>

      {roomsData.rooms.map((roomData, index) => (
        <div
          className={`room-wrap ${roomData.groups ? "large" : ""}`}
          key={index}
        >
          <div className="room-name">
            <span>{roomData.roomName}</span>
          </div>
          <div className="room-img">
            <img src={roomData.img} className="ui-li-icon" alt="img1" />
          </div>
          {roomData.groups ? (
            <>
              <div className="groups-show">
                <button onClick={() => toggleGroups(index)}>
                  {selectedRoomIndex === index ? "접기" : "펼치기"}
                </button>
              </div>
              {selectedRoomIndex === index && (
                <div className="groups-list">
                  {roomData.groups.map((group, groupIndex) => (
                    <div className="group-item" key={groupIndex}>
                      <div className="group-name">
                        <span>{group.roomName}</span>
                      </div>
                      <div className="group-buttons">
                        <button onClick={() => reserveFunc(group)}>
                          예약하기
                        </button>
                        <button
                          onClick={() => {
                            dispatch(resetMonthData());
                            setOpenCalendar(true);
                            setRoomData(group);
                          }}
                        >
                          예약현황
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="room-buttons">
              <button onClick={() => reserveFunc(roomData)}>예약하기</button>
              <button
                onClick={() => {
                  dispatch(resetMonthData());
                  setOpenCalendar(true);
                  setRoomData(roomData);
                }}
              >
                예약현황
              </button>
            </div>
          )}
        </div>
      ))}
      {openCalendar && (
        <MyCalendar
          isModal={true}
          setOpenCalendar={setOpenCalendar}
          roomData={roomData}
        />
      )}
      {openAdminLogin && <AdminLogin setOpenAdminLogin={setOpenAdminLogin} />}
    </div>
  );
};

export default RoomPick;
