import { call, put, takeEvery } from "@redux-saga/core/effects";
import {
  reserveRoomApi,
  reserveRoomCntApi,
  monthDataApi,
  cancelReservationApi,
  adminLoginApi,
} from "../api/reservationApi";
import {
  reserveRoom,
  reserveRoomSuccess,
  reserveRoomFailure,
  reserveRoomCnt,
  reserveRoomCntSuccess,
  reserveRoomCntFailure,
  getMonthData,
  getMonthDataSuccess,
  getMonthDataFailure,
  cancelReservation,
  cancelReservationSuccess,
  cancelReservationFailure,
  adminLogin,
  adminLoginSuccess,
  adminLoginFailure,
} from "./reservationSlice";

function* reservationAxios(action) {
  try {
    const data = yield call(reserveRoomApi, action.payload);
    yield put(reserveRoomSuccess(data.data));
  } catch (e) {
    yield put(reserveRoomFailure(e));
  }
}
function* reservationCntAxios(action) {
  try {
    const data = yield call(reserveRoomCntApi, action.payload);
    yield put(reserveRoomCntSuccess(data.data));
  } catch (e) {
    yield put(reserveRoomCntFailure(e));
  }
}
function* monthDataAxios(action) {
  try {
    const data = yield call(monthDataApi, action.payload);
    yield put(getMonthDataSuccess(data.data));
  } catch (e) {
    yield put(getMonthDataFailure(e));
  }
}
function* cancelReservationAxios(action) {
  try {
    const data = yield call(cancelReservationApi, action.payload);
    yield put(cancelReservationSuccess(data.data));
  } catch (e) {
    yield put(cancelReservationFailure(e));
  }
}
function* adminLoginAxios(action) {
  try {
    const data = yield call(adminLoginApi, action.payload);
    yield put(adminLoginSuccess(data.data));
  } catch (e) {
    yield put(adminLoginFailure(e));
  }
}

function* reservationSaga() {
  yield takeEvery(reserveRoom, reservationAxios);
  yield takeEvery(reserveRoomCnt, reservationCntAxios);
  yield takeEvery(getMonthData, monthDataAxios);
  yield takeEvery(cancelReservation, cancelReservationAxios);
  yield takeEvery(adminLogin, adminLoginAxios);
}
export default reservationSaga;
