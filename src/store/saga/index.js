import { all, fork } from "@redux-saga/core/effects";

export default function* rootSaga() {
  yield all([
    // fork(reportSaga),
  ]);
}
