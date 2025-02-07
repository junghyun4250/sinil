import instance from "../../libs/script/axiosConfig";

// 교회 실실 예약
const reserveRoomApi = (param) => {
  return instance.post("/api/reserveRoom", param);
};
// 전체 예약 숫자
const reserveRoomCntApi = (param) => {
  return instance.post("/api/reserveRoomCnt", param);
};
// 월별 예약 데이터 조회
const monthDataApi = (param) => {
  return instance.post("/api/monthData", param);
};

const cancelReservationApi = (param) => {
  return instance.post("/api/cancelReservation", param);
};
const adminLoginApi = (param) => {
  return instance.post("/api/adminLogin", param);
};

export {
  reserveRoomApi,
  reserveRoomCntApi,
  monthDataApi,
  cancelReservationApi,
  adminLoginApi,
};
