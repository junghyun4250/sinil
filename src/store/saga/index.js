import { all, fork } from "@redux-saga/core/effects";
import reservationSaga from "../../pages/reservation/module/reservationSaga";

export default function* rootSaga() {
  yield all([fork(reservationSaga)]);
}
