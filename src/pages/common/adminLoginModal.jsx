import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../reservation/module/reservationSlice";

const AdminLoginModal = ({ setOpenAdminLogin }) => {
  const dispatch = useDispatch();
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    // 여기에 로그인 로직을 추가하세요
    console.log("Admin ID:", adminId);
    console.log("Admin Password:", adminPassword);
    const param = {
      adminId,
      adminPassword,
    };
    dispatch(adminLogin(param));
    // 로그인 성공 시 모달 닫기
    setOpenAdminLogin(false);
  };

  return (
    <div className="overlay">
      <div className="login-wrap">
        <div className="login-header">
          <span>관리자 로그인</span>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-login">
            <input
              type="text"
              placeholder="관리자 아이디"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              type="password" // 비밀번호 필드는 type="password"를 사용하는 것이 좋습니다.
              placeholder="관리자 비밀번호"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <div className="login-button">
            <button type="submit" className="closeBtn">
              로그인
            </button>
            <button
              type="button" // type="button"으로 설정하여 폼 제출 방지
              className="closeBtn"
              onClick={() => setOpenAdminLogin(false)}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
