import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga";
import { createLogger } from "redux-logger";
import reservationReducer from "../pages/reservation/module/reservationSlice";

// 루트 리듀서 정의
const rootReducer = combineReducers({
  reservation: reservationReducer,
});

// 미들웨어 생성
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// 스토어 구성
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      sagaMiddleware,
      logger
    ),
});

// 사가 실행
sagaMiddleware.run(rootSaga);

export default store;
