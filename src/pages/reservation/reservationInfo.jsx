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
  const [selected, setSelected] = useState(""); // 부서 선택
  const [mokjang, setMokjang] = useState(""); // 목장 입력
  const [name, setName] = useState(""); // 예약자 입력
  const [contactNum, setContactNum] = useState(""); // 연락처 입력
  const [numCnt, setNumCnt] = useState(""); // 인원 수 입력
  const [department, setDepartment] = useState(""); // 부서 설명
  const [isErrorContact, setIsErrorContact] = useState(false); // 연락처 에러 상태
  const [isErrorNumCnt, setIsErrorNumCnt] = useState(false); // 인원수 에러 상태
  const contactRef = useRef(null);
  const numCntRef = useRef(null);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleChangeContact = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
      setContactNum(onlyNumbers);
      setIsErrorContact(false); // 에러 해제
    } else {
      setIsErrorContact(true); // 에러 상태 활성화
      if (contactRef.current) {
        contactRef.current.focus(); // input에 포커스 주기
      }
    }
  };
  const handleChangeNumCnt = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
      setNumCnt(onlyNumbers);
      setIsErrorNumCnt(false); // 에러 해제
    } else {
      setIsErrorNumCnt(true); // 에러 상태 활성화
      if (numCntRef.current) {
        numCntRef.current.focus(); // input에 포커스 주기
      }
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (!selected || !mokjang || !name || !contactNum || !numCnt) {
      alert("모든 필수 입력 항목을 작성해주세요.");
      return;
    }

    // 입력된 데이터 객체 생성
    const formData = {
      department: selected,
      mokjang,
      name,
      contactNum,
      numCnt,
      departmentDescription: department,
    };

    console.log("제출된 데이터:", formData);

    alert("예약이 완료되었습니다!");

    // 폼 초기화
    setSelected("");
    setMokjang("");
    setName("");
    setContactNum("");
    setNumCnt("");
    setDepartment("");
    setIsErrorContact(false);
    setIsErrorNumCnt(false);
  };
  const handleCancel = () => {
    // 모든 입력값 초기화
    setSelected("");
    setMokjang("");
    setName("");
    setContactNum("");
    setNumCnt("");
    setDepartment("");
    setIsErrorContact(false);
    setIsErrorNumCnt(false);
    navigate(-1);
    // alert("입력이 초기화되었습니다.");
  };

  return (
    <>
      <div className="reservation-Info-wrap">
        <div className="reservation-Info-header">
          <span>예약 정보</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="reservation-info-body">
            <div className="time-select"></div>
            <div className="info">
              <span>부&nbsp;서</span>
              <select
                className="input-info"
                id="dropdown"
                value={selected}
                onChange={handleChange}
              >
                <option value="">-- 선택하세요 --</option>
                <option value="option1">사역자</option>
                <option value="option2">장년부</option>
                <option value="option3">청년부</option>
                <option value="option4">청소년부</option>
                <option value="option5">유초등부</option>
                <option value="option6">유년부</option>
                <option value="option7">유치부</option>
                <option value="option8">영아부</option>
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
                ref={contactRef} // input 요소에 ref 연결
                className="input-info"
                value={contactNum}
                onChange={handleChangeContact}
                placeholder="(필수) 숫자만 입력하세요"
                style={{
                  border: isErrorContact ? "2px solid red" : "", // 에러 상태에 따라 border 변경
                  outline: "none", // 기본 outline 제거
                }}
              />
            </div>
            <div className="info">
              <span>인원수</span>
              <input
                type="text"
                ref={numCntRef} // input 요소에 ref 연결
                className="input-info"
                value={numCnt}
                onChange={handleChangeNumCnt}
                placeholder="(필수) 숫자만 입력하세요"
                style={{
                  border: isErrorNumCnt ? "2px solid red" : "", // 에러 상태에 따라 border 변경
                  outline: "none", // 기본 outline 제거
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
          </div>
          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              취소
            </button>
            <button type="submit" className="submit-button">
              예약하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationInfo;
