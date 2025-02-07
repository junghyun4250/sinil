import React, { useState } from "react";

const ReservationCancelModal = ({ cancelData, res_id, onClose, onSubmit }) => {
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
    if (!reservationInfo.name || !reservationInfo.contactNum) {
      alert("예약자와 연락처를 입력해주세요.");
      return;
    }
    onSubmit(reservationInfo); // 입력된 정보를 상위 컴포넌트로 전달
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>예약 취소</h4>
        <div>
          <label>{cancelData}</label>
        </div>
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
        <button onClick={handleSubmit}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ReservationCancelModal;
