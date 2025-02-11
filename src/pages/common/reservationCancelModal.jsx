import React, { useState } from "react";

const ReservationCancelModal = ({ cancelData, res_id, onClose, onSubmit }) => {
  // ✅ localStorage에서 id와 idx 가져오기
  const storedId = localStorage.getItem("id");
  const storedIdx = localStorage.getItem("idx");

  const [reservationInfo, setReservationInfo] = useState({
    name: "",
    contactNum: "",
    res_id: res_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!storedId || !storedIdx) {
      if (!reservationInfo.name || !reservationInfo.contactNum) {
        alert("예약자와 연락처를 입력해주세요.");
        return;
      }
    }

    // ✅ 기존 정보(name, contactNum)를 유지하면서 id, idx도 추가
    const submitData = {
      ...reservationInfo, // 기존 입력된 정보 포함
      id: storedId || "", // localStorage 값이 있으면 추가
      idx: storedIdx || "",
    };

    onSubmit(submitData); // 상위 컴포넌트로 전달
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>예약 취소</h4>
        <div>
          <label>{cancelData}</label>
        </div>

        {/* ✅ id와 idx가 없을 때만 입력 필드 표시 */}
        {!storedId && !storedIdx && (
          <>
            <div>
              <label>예약자 이름</label>
              <input
                type="text"
                name="name"
                value={reservationInfo.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>연락처</label>
              <input
                type="text"
                name="contactNum"
                value={reservationInfo.contactNum}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button onClick={handleSubmit}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ReservationCancelModal;
