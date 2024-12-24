import { call, put, takeEvery } from "@redux-saga/core/effects";
import { reserveRoomApi, reserveRoomCntApi } from "../api/reservationApi";
import {
  reserveRoom,
  reserveRoomSuccess,
  reserveRoomFailure,
  reserveRoomCnt,
  reserveRoomCntSuccess,
  reserveRoomCntFailure,
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

function* reservationSaga() {
  yield takeEvery(reserveRoom, reservationAxios);
  yield takeEvery(reserveRoomCnt, reservationCntAxios);
}
export default reservationSaga;
