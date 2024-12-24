import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReserved: 0,
  totalResCnt: 0,
};

const reducers = {
  reserveRoom: (state, action) => {
    state.isLoading = true;
  },
  reserveRoomSuccess: (state, action) => {
    console.log("예약 성공");
    state.isReserved += 1;
  },
  reserveRoomFailure: (state, action) => {
    console.log("예약 실패패");
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
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers,
});

export const {
  reserveRoom,
  reserveRoomSuccess,
  reserveRoomFailure,
  reserveRoomCnt,
  reserveRoomCntSuccess,
  reserveRoomCntFailure,
} = reservationSlice.actions;

export default reservationSlice.reducer;
