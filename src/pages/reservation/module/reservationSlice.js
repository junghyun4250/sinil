import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReserved: 0,
  totalResCnt: 0,
  monthData: [],
  calendarReload: false,
  isAdmin: {
    idx: "",
    id: "",
  },
};

const reducers = {
  resetCalendarReload: (state, action) => {
    state.calendarReload = false;
  },
  reserveRoom: (state, action) => {
    state.isLoading = true;
  },
  reserveRoomSuccess: (state, action) => {
    console.log("예약 성공");
    state.calendarReload = true;
  },
  reserveRoomFailure: (state, action) => {
    console.log("예약 실패");
    state.isLoading = false;
  },
  reserveRoomCnt: (state, action) => {
    state.isLoading = true;
  },
  reserveRoomCntSuccess: (state, action) => {
    console.log("예약 성공");
    console.log("result = ", action.payload);
    state.totalResCnt = action.payload.total_cnt;
  },
  reserveRoomCntFailure: (state, action) => {
    console.log("예약 실패패");
  },
  getMonthData: (state, action) => {
    state.isLoading = true;
  },
  getMonthDataSuccess: (state, action) => {
    state.isLoading = false;
    state.monthData = action.payload.monthData;
  },
  getMonthDataFailure: (state, action) => {
    state.isLoading = false;
  },
  resetMonthData: (state, action) => {
    state.monthData = [];
  },
  cancelReservation: (state, action) => {
    state.isLoading = true;
  },
  cancelReservationSuccess: (state, action) => {
    console.log("예약 취소 성공");
    if (action.payload) state.calendarReload = true;
  },
  cancelReservationFailure: (state, action) => {
    console.log("예약 취소 성공");
  },
  adminLogin: (state, action) => {
    state.isLoading = true;
  },
  adminLoginSuccess: (state, action) => {
    console.log("로그인 성공");
    state.isAdmin.idx = action.payload.idx;
    state.isAdmin.id = action.payload.id;
  },
  adminLoginFailure: (state, action) => {
    console.log("로그인 실패");
  },
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers,
});

export const {
  resetCalendarReload,
  reserveRoom,
  reserveRoomSuccess,
  reserveRoomFailure,
  reserveRoomCnt,
  reserveRoomCntSuccess,
  reserveRoomCntFailure,
  getMonthData,
  getMonthDataSuccess,
  getMonthDataFailure,
  resetMonthData,
  cancelReservation,
  cancelReservationSuccess,
  cancelReservationFailure,
  adminLogin,
  adminLoginSuccess,
  adminLoginFailure,
} = reservationSlice.actions;

export default reservationSlice.reducer;
