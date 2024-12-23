import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoading: false,
};

const reducers = {
  // userList: (state, action) => {
  //     state.isLoading = true;
  // },
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers,
});

export const {
  // userList,
} = reservationSlice.actions;

export default reservationSlice.reducer;
