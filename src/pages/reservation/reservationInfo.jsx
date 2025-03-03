import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reserveRoom } from "../reservation/module/reservationSlice";

const ReservationInfo = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomData } = state;

  const monthData = useSelector((state) => state.reservation.monthData);

  const [selected, setSelected] = useState(""); // 부서 선택
  const [mokjang, setMokjang] = useState(""); // 목장 입력
  const [name, setName] = useState(""); // 예약자 입력
  const [contactNum, setContactNum] = useState(""); // 연락처 입력
  const [numCnt, setNumCnt] = useState(""); // 인원 수 입력
  const [department, setDepartment] = useState(""); // 부서 설명
  const [isErrorContact, setIsErrorContact] = useState(false);
  const [isErrorNumCnt, setIsErrorNumCnt] = useState(false);

  // 예약 시간 관련 상태
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 개인정보 동의 체크박스 상태
  const [isAgreed, setIsAgreed] = useState(false);
  const [isErrorAgreed, setIsErrorAgreed] = useState(false);
  const agreeRef = useRef(null);

  const contactRef = useRef(null);
  const numCntRef = useRef(null);

  // 현재 시간 가져오기
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour
    .toString()
    .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

  // 예약 가능한 시간 리스트 (09:00 ~ 18:00)
  const availableTimes = Array.from({ length: 19 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  });

  // 오늘 날짜인지 확인
  const isToday = selectedDate === now.toISOString().split("T")[0];

  // 현재 방과 날짜의 기존 예약 필터링
  const existingReservations = monthData.filter(
    (reservation) =>
      reservation.roomCode === roomData.roomId &&
      reservation.date === selectedDate
  );

  // 시간을 분으로 변환
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // 예약된 시간 확인
  const isTimeBooked = (time) => {
    return existingReservations.some((reservation) => {
      const resStart = timeToMinutes(reservation.startTime);
      const resEnd = timeToMinutes(reservation.endTime);
      const timeMins = timeToMinutes(time);
      return timeMins >= resStart && timeMins < resEnd;
    });
  };

  // 예약 가능 시간 필터링 (기존 예약 제외)
  const filteredAvailableTimes = availableTimes.filter((time) => {
    const isAfterCurrent = !isToday || time >= currentTime;
    return isAfterCurrent && !isTimeBooked(time);
  });

  // // 오늘 날짜일 경우 현재 시간 이후의 시간만 필터링
  // const filteredAvailableTimes = isToday
  //   ? availableTimes.filter((time) => time >= currentTime)
  //   : availableTimes;

  // 종료시간 선택 옵션 (시작시간 이후만 선택 가능)
  const filteredEndTimes = startTime
    ? filteredAvailableTimes.filter((time) => time > startTime)
    : [];

  const handleChangeContact = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setContactNum(value);
    setIsErrorContact(value.length < 10); // 10자리 미만이면 에러
  };

  const handleChangeNumCnt = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNumCnt(value);
    setIsErrorNumCnt(value === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selected ||
      !mokjang ||
      !name ||
      !contactNum ||
      !numCnt ||
      !startTime ||
      !endTime
    ) {
      alert("모든 필수 입력 항목을 작성해주세요.");
      return;
    }

    if (!isAgreed) {
      setIsErrorAgreed(true);
      agreeRef.current.focus();
      return;
    }

    // 중복 예약 체크
    const newStartMinutes = timeToMinutes(startTime);
    const newEndMinutes = timeToMinutes(endTime);

    const isOverlapping = existingReservations.some((reservation) => {
      const existingStart = timeToMinutes(reservation.startTime);
      const existingEnd = timeToMinutes(reservation.endTime);
      return newStartMinutes < existingEnd && newEndMinutes > existingStart;
    });

    if (isOverlapping) {
      alert(
        "선택한 시간대에 이미 예약이 존재합니다. 다른 시간을 선택해주세요."
      );
      return;
    }

    const formData = {
      roomCode: roomData.roomId,
      date: selectedDate,
      department: selected,
      mokjang,
      name,
      contactNum,
      numCnt,
      departmentDescription: department,
      startTime,
      endTime,
    };

    console.log("제출된 데이터:", formData);
    dispatch(reserveRoom(formData));
    alert("예약이 완료되었습니다!");

    // 폼 초기화
    setSelectedDate("");
    setSelected("");
    setMokjang("");
    setName("");
    setContactNum("");
    setNumCnt("");
    setDepartment("");
    setStartTime("");
    setEndTime("");
    setIsAgreed(false);
  };

  const handleCancel = () => {
    setSelectedDate("");
    setSelected("");
    setMokjang("");
    setName("");
    setContactNum("");
    setNumCnt("");
    setDepartment("");
    setStartTime("");
    setEndTime("");
    setIsAgreed(false);
    navigate(-1);
  };

  return (
    <div className="reservation-Info-wrap">
      {selectedDate.length > 0 ? (
        <>
          <div className="reservation-Info-header">
            <span>예약 정보 입력</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="reservation-info-body">
              <div className="info time-select">
                <span>시&nbsp;작</span>
                <select
                  className="input-info-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  <option value="">-- 선택하세요 --</option>
                  {filteredAvailableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <span>종&nbsp;료</span>
                <select
                  className="input-info-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                >
                  <option value="">-- 선택하세요 --</option>
                  {filteredEndTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="info">
                <span>부&nbsp;서</span>
                <select
                  className="input-info"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">-- 선택하세요 --</option>
                  <option value="교역자">교역자</option>
                  <option value="장년부">장년부</option>
                  <option value="청년국">청년국</option>
                  <option value="청소년부">청소년부</option>
                  <option value="초등부">초등부</option>
                  <option value="유년부">유년부</option>
                  <option value="유치부">유치부</option>
                  <option value="영아부">영아부</option>
                </select>
              </div>

              <div className="info">
                <span>목&nbsp;장</span>
                <input
                  className="input-info"
                  type="text"
                  value={mokjang}
                  onChange={(e) => setMokjang(e.target.value)}
                  placeholder="필수 항목 입니다."
                />
              </div>

              <div className="info">
                <span>예약자</span>
                <input
                  className="input-info"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="필수 항목 입니다."
                />
              </div>

              <div className="info">
                <span>연락처</span>
                <input
                  type="text"
                  ref={contactRef}
                  className="input-info"
                  value={contactNum}
                  onChange={handleChangeContact}
                  placeholder="(필수) 숫자만 입력하세요"
                  style={{
                    border: isErrorContact ? "2px solid red" : "",
                    outline: "none",
                  }}
                />
              </div>

              <div className="info">
                <span>인원수</span>
                <input
                  type="text"
                  ref={numCntRef}
                  className="input-info"
                  value={numCnt}
                  onChange={handleChangeNumCnt}
                  placeholder="(필수) 숫자만 입력하세요"
                  style={{
                    border: isErrorNumCnt ? "2px solid red" : "",
                    outline: "none",
                  }}
                />
              </div>

              <div className="info">
                <span>내&nbsp;용</span>
                <textarea
                  className="input-info-area"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              {/* 개인정보 수집 동의 체크박스 */}
              <div className="info">
                <input
                  type="checkbox"
                  id="agree"
                  ref={agreeRef}
                  checked={isAgreed}
                  onChange={() => {
                    setIsAgreed(!isAgreed);
                    setIsErrorAgreed(false);
                  }}
                  style={{
                    transform: "scale(1.2)",
                    marginRight: "8px",
                    accentColor: isErrorAgreed ? "red" : "",
                  }}
                />
                <label
                  htmlFor="agree"
                  style={{
                    color: isErrorAgreed ? "red" : "",
                    fontWeight: isErrorAgreed ? "bold" : "normal",
                  }}
                >
                  개인정보 수집에 동의하십니까?
                </label>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="submit-button">
                예약하기
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="reservation-info-body">
            <h3>날짜를 선택해 주세요.</h3>
          </div>
          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationInfo;
