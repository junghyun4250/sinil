import instance from "../../libs/script/axiosConfig";

// 교회 실실 예약
const reserveRoomApi = (param) => {
  return instance.post("/api/reserveRoom", param);
};
// 전체 예약 숫자자
const reserveRoomCntApi = (param) => {
  return instance.post("/api/reserveRoomCnt", param);
};

export { reserveRoomApi, reserveRoomCntApi };
