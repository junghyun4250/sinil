import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReservationCancelModal from "../common/reservationCancelModal";
import {
  getMonthData,
  cancelReservation,
} from "../reservation/module/reservationSlice";

const MyCalendar = ({
  isModal,
  setOpenCalendar,
  selectedDate,
  setSelectedDate,
  roomData,
}) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false); // 예약 취소 모달 상태
  const [cancelData, setCancelData] = useState(""); // 예약 취소 정보
  const [res_id, setRes_id] = useState(); // 예약 취소 정보
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [modalSelectedDate, setModalSelectedDate] = useState("");
  const calendarRef = useRef(null);
  const monthData = useSelector((state) => state.reservation.monthData);
  const calendarReload = useSelector(
    (state) => state.reservation.calendarReload
  );

  useEffect(() => {
    const param = { currentYear, currentMonth, roomCode: roomData.roomId };
    callMonthData(param);
  }, [calendarReload]);

  const handleEventClick = useCallback((info) => {
    setModalSelectedDate(info.event.startStr);
    setSelectedEvent(info.event);
    setShowModal(true);
  }, []);

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelSubmit = (reservationInfo) => {
    console.log("예약자 정보:", reservationInfo);
    dispatch(cancelReservation(reservationInfo));
    setShowCancelModal(false);
  };

  const handleDatesSet = (arg) => {
    const currentDate = arg.view.currentStart;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const currentYear = `${year}`;
    const currentMonth = `${month}`;
    setShowModal(false);
    setCurrentYear(currentYear);
    setCurrentMonth(currentMonth);

    const param = { currentYear, currentMonth, roomCode: roomData.roomId };
    callMonthData(param);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // 선택한 날짜 업데이트
    console.log("선택한 날짜:", info.dateStr);

    // 선택한 날짜를 events 상태에 추가
    setEvents((prevEvents) => [
      ...prevEvents.filter((e) => e.className !== "selected-date"), // 기존 선택 날짜 제거
      {
        title: "",
        start: info.dateStr,
        allDay: true,
        display: "background", // ✅ 배경색만 표시
        backgroundColor: "#3d77ff", // ✅ 선택한 날짜 색상 (주황색 계열)
        className: "selected-date", // ✅ 선택한 날짜임을 구분하기 위한 클래스
      },
    ]);
  };

  const callMonthData = (param) => {
    console.log("param: ", param);
    dispatch(getMonthData(param));
  };

  useEffect(() => {
    if (currentYear && currentMonth) {
      console.log("현재 년:", currentYear);
      console.log("현재 월:", currentMonth);
      const param = { currentYear, currentMonth, roomCode: roomData.roomId };
      callMonthData(param);
    }
  }, [currentMonth]);

  useEffect(() => {
    if (monthData.length > 0) {
      console.log("monthData = ", monthData);
      const eventList = [];
      const countByDate = {};

      // 날짜별 이벤트 수 계산
      monthData.forEach((item) => {
        if (countByDate[item.date]) {
          countByDate[item.date]++;
        } else {
          countByDate[item.date] = 1;
        }
      });

      // countByDate 객체를 기반으로 eventList 생성
      Object.keys(countByDate).forEach((date) => {
        const eventObj = {
          title: countByDate[date] + "개",
          date: date,
          description: "당일 예약 총 수",
        };
        eventList.push(eventObj);
      });

      setEvents(eventList);
    }
  }, [monthData]);

  const showTimeline = useCallback(() => {
    return monthData
      .filter((data) => data.date === selectedDate) // 🔹 선택한 날짜와 같은 데이터만 필터링
      .map((data, index) => (
        <p key={index}>
          예약 내역: {data.startTime} ~ {data.endTime} ({data.mokjang})
        </p>
      ));
  }, [selectedDate, monthData]); // 🔹 selectedDate가 변경될 때만 실행

  return (
    <div className="overlay">
      <div className="calendar">
        <FullCalendar
          ref={calendarRef}
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          eventClick={isModal && handleEventClick}
          datesSet={handleDatesSet}
          dateClick={!isModal && handleDateClick} // 🔹 빈 날짜 클릭 이벤트 추가
        />

        {/* 선택한 날짜 출력 */}
        <div
          className="reserved-history"
          style={{ display: isModal && "none" }}
        >
          {!isModal && selectedDate && showTimeline()}
        </div>
        {/* 🔹 이벤트 상세 모달 */}
        {showModal &&
          isModal &&
          monthData.map((data, index) => {
            if (modalSelectedDate === data.date) {
              return (
                <div className="modal" key={index}>
                  <p>
                    {data.startTime} ~ {data.endTime} - {data.mokjang}
                  </p>
                  <button
                    onClick={() => {
                      handleCancelClick();
                      setCancelData(
                        `${data.startTime} ~ ${data.endTime} - ${data.mokjang}`
                      );
                      setRes_id(data.res_id);
                    }}
                  >
                    예약취소
                  </button>
                </div>
              );
            }
            return null; // 조건에 맞지 않는 경우 null 반환
          })}

        {/* 🔹 예약 취소 모달 */}
        {showCancelModal && (
          <ReservationCancelModal
            cancelData={cancelData}
            res_id={res_id}
            onClose={() => setShowCancelModal(false)}
            onSubmit={handleCancelSubmit}
          />
        )}

        {/* 닫기 버튼 */}
        {isModal && (
          <button className="closeBtn" onClick={() => setOpenCalendar(false)}>
            닫기
          </button>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
